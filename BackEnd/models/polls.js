const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0,
    },
});

const pollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    question: String,
    options: [optionSchema],
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

// pollSchema.pre("remove", async function (next) {
//     try {
//         const user = await User.findById(this.user);
//         user.polls = user.polls.filter(
//             (poll) => poll._id.toString() !== this._id.toString()
//         );
//         await user.save();
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = mongoose.model("poll", pollSchema);
