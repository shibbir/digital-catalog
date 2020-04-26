const Brand = require("./brand.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

function getBrand(req, res) {
    Brand.findOne({ _id: req.params.id, createdBy: req.user._id }).exec(function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: "Brand not found or you don't have the permission." });
        }

        res.json(doc);
    });
}

async function getBrands(req, res) {
    const admin = await User.findOne({role: "admin"});

    try {
        const docs = await Brand.find({ $or: [
            { createdBy : req.user.id },
            { createdBy: admin.id }
        ]}).sort("name").exec();

        res.json(docs);
    } catch(err) {
        return res.sendStatus(500);
    }
}

function createBrand(req, res) {
    let model = new Brand({
        name: req.body.name,
        slug: convertToSlug(req.body.name),
        createdBy: req.user._id
    });

    model.save();

    res.json(model);
}

function updateBrand(req, res) {
    Brand.findOne({
        name: { $regex: req.body.name, $options: "i" }
    }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400);
        }

        Brand.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.status(400);
            }

            doc.name = req.body.name;
            doc.slug = convertToSlug(req.body.name);

            doc.save();
            res.json(doc);
        });
    });
}

exports.getBrand = getBrand;
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
