const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: ObjectId, default: ObjectId},
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get:  (date) => {
        if (date) return date.toISOString().split("T") [0];
      },}
});

module.exports = Reaction;