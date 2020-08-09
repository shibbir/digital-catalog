const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const specHelper = require("./spec.helper");
const Item = require("../src/modules/item/server/item.model");
const Brand = require("../src/modules/brand/server/brand.model");
const Category = require("../src/modules/category/server/category.model");
const app = require("../src/config/server/lib/express")();

describe("Item Routes", function() {
    let category = {};
    let brand = {};
    let item = {};
    const user = specHelper.users.admin;

    before(async function() {
        category = new Category({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        });

        category = await category.save();

        brand = new Brand({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        });

        brand = await brand.save();

        item = new Item({
            name: faker.commerce.productName(),
            categoryId: category._id,
            brandId: brand._id,
            createdBy: user._id,
            currency: "USD"
        });

        item = await item.save();
    });

    it("Should fetch all items", async function() {
        const result = await request(app)
            .get("/api/items")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should create new item", async function() {
        const result = await request(app)
            .post("/api/items")
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id,
                currency: "USD"
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should fetch an item", async function() {
        const result = await request(app)
            .get(`/api/items/${item._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should update an item", async function() {
        const result = await request(app)
            .put(`/api/items/${item._id}`)
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id,
                currency: "USD"
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should fetch yearly report", async function() {
        const result = await request(app)
            .get("/api/items/yearRange/2015-2019")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should delete an item", async function() {
        const result = await request(app)
            .delete(`/api/items/${item._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });
});
