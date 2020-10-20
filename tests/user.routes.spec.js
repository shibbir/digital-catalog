const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const specHelper = require("./spec.helper");
const app = require("../src/config/server/lib/express")();

describe("User Routes", function() {
    const user = specHelper.users.admin;

    it("Should create a basic user", async function() {
        const result = await request(app)
            .post("/api/register")
            .send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });

        expect(result.status).to.equal(200);
    });

    it("Should login with valid username and password", async function() {
        const result = await request(app)
            .post("/api/login")
            .send({
                username: user.email,
                password: user.password,
                grant_type: "password"
            });

        expect(result.status).to.equal(200);
    });

    it("Should fetch profile for signed in user", async function() {
        const result = await request(app)
            .get("/api/profile")
            .set("Cookie", [`access_token=${user.accessToken};refresh_token=${user.local.refresh_token}`]);

        expect(result.status).to.equal(200);
    });

    it("Should allow user to update the password", async function() {
        const result = await request(app)
            .put("/api/profile/change-password")
            .set("Cookie", [`access_token=${user.accessToken};refresh_token=${user.local.refresh_token}`])
            .send({
                currentPassword: user.password,
                newPassword: "xxx-xxx-xxx-xxx"
            });

        expect(result.status).to.equal(200);
    });

    it("Should send an email if user forgets password", async function() {
        const result = await request(app)
            .post("/api/forgot-password")
            .set("Cookie", [`access_token=${user.accessToken};refresh_token=${user.local.refresh_token}`])
            .send({
                email: user.local.email
            });

        expect(result.status).to.equal(200);
    });
});
