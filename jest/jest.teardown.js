const mongoose = require("mongoose");

process.env.NODE_ENV = "test";
process.env.MONGODB_TEST_BASE_URL = "mongodb://localhost";
process.env.MONGODB_URI = `${process.env.MONGODB_TEST_BASE_URL}/gadget-catalog-test`;

module.exports = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
};
