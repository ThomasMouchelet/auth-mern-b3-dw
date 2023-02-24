const mongoose = require('mongoose');
const { Schema } = mongoose;

const resetPasswordToken = new Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('ResetPasswordToken', resetPasswordToken);