const multer = require("../../../config/server/lib/multer");
const { allowRoles, jwtAuthentication } = require("../../core/server/authorize.middleware");

module.exports = function(app) {
    const controller = require("./category.controller");

    app.route("/api/categories")
        .get(jwtAuthentication, controller.getCategories)
        .post(jwtAuthentication, allowRoles(["admin"]), multer.single("file"), controller.createCategory);

    app.route("/api/categories/:id")
        .get(jwtAuthentication, allowRoles(["admin"]), controller.getCategory)
        .put(jwtAuthentication, allowRoles(["admin"]), multer.single("file"), controller.updateCategory);
};
