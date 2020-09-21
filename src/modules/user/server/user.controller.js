const axios = require("axios");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./user.model");

function generateAccessToken(user) {
    return jwt.sign({
        _id: user._id,
    }, process.env.TOKEN_SECRET,{
        expiresIn: "1d",
        issuer: user._id.toString()
    });
}

function formatProfile(user) {
    const profile = {
        _id: user._id,
        name: user.displayName,
        isAdmin: user.role === "admin"
    };

    if(user.local) {
        profile.local = {
            email: user.local.email
        };
    }

    if(user.facebook) {
        profile.facebook = {
            email: user.facebook.email
        };
    }

    if(user.google) {
        profile.google = {
            email: user.google.email
        };
    }

    return profile;
}

async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const doc = await User.findOne({ $or: [
            { "local.email": email },
            { "facebook.email": email },
            { "google.email": email }
        ]});

        if(doc) {
            return res.status(400).send("This email address is already registered.");
        }

        const user = new User();

        user.displayName = name;
        user.local.name = name;
        user.local.email = email;
        user.local.password = user.generateHash(password);

        user.save(function(err, doc) {
            if(err) return res.sendStatus(500);

            res.cookie("access_token", generateAccessToken(doc), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json({
                name: name,
                isAdmin: false
            });
        });
    } catch(err) {
        if(err) return res.sendStatus(500);
    }
}

async function login(req, res) {
    try {
        const doc = await User.findOne({ "local.email": req.body.email });

        if(!doc || !doc.validPassword(req.body.password)) {
            return res.status(401).send("Invalid email or password.");
        }

        res.cookie("access_token", generateAccessToken(doc), {
            expires: new Date(Date.now() + 8.64e+7),
            httpOnly: true
        });

        res.json(formatProfile(doc.toJSON()));
    } catch (err) {
        return res.sendStatus(500);
    }
}

function logout(req, res) {
    res.clearCookie("access_token").redirect("/");
}

async function changePassword(req, res) {
    try {
        const doc = await User.findOne({ _id: req.user._id }, "local");

        if(!doc || !doc.validPassword(req.body.currentPassword)) {
            return res.status(400).send("Invalid password!");
        }

        doc.local.password = doc.generateHash(req.body.newPassword);
        doc.save();

        res.status(200).send("Password changed successfully.");
    } catch (err) {
        return res.sendStatus(500);
    }
}

function forgotPassword(req, res) {
    User.findOne({ $or: [
        { "facebook.email" : req.body.email },
        { "google.email": req.body.email },
        { "local.email": req.body.email }
    ]}, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) return res.status(404).send("No account is associated with this email address.");

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.MAILER_ADDRESS,
                pass: process.env.MAILER_PASSWORD
            }
        });

        doc.local.resetPasswordToken = crypto.randomBytes(20).toString("hex");
        doc.local.resetPasswordExpires = Date.now() + 3600000;

        doc.save().then(function() {
            res.render("password-reset.html", {
                url: `${req.headers.origin}/reset-password?token=${doc.local.resetPasswordToken}`
            }, function(err, html) {
                transporter.sendMail({
                    from: `"Gadget Catalog" <${process.env.MAILER_ADDRESS}>`,
                    to: req.body.email,
                    subject: "[Gadget Catalog] Password Reset Request",
                    html: html
                }, function (err) {
                    if(err) return res.sendStatus(500);

                    res.sendStatus(200);
                });
            });
        });
    });
}

async function resetPassword(req, res) {
    try {
        const doc = User.findOne({
            "local.resetPasswordToken": req.query.token,
            "local.resetPasswordExpires": {
                $gt: Date.now()
            }
        });

        if(!doc) return res.status(401).send("Account doesn't exist or the token has expired.");

        if(req.body.newPassword !== req.body.confirmNewPassword) return res.sendStatus(400);

        doc.local.password = doc.generateHash(req.body.newPassword);
        doc.save();

        res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
}

function getSignedInUserProfile(req, res) {
    res.json(formatProfile(req.user.toJSON()));
}

function disconnect(req, res) {
    if(!req.query.provider) return res.sendStatus(400);

    if(req.query.provider === "facebook") {
        axios.delete(`https://graph.facebook.com/${req.user.facebook.id}/permissions?access_token=${req.user.facebook.accessToken}`).then(() => {
            User.findOneAndUpdate({_id: req.user._id}, {$unset: {facebook: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
        }).catch(() => res.sendStatus(500));
    } else {
        User.findOneAndUpdate({_id: req.user._id}, {$unset: {google: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
    }
}

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getSignedInUserProfile = getSignedInUserProfile;
exports.disconnect = disconnect;
