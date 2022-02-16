const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test", (error, resp) => {
    if (error) {
        console.log("Error connecting to db");
    } else {
        // console.log("Successfully connected to db");
    }
});
