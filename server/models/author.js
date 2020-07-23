const mongoose = require('mongoose');


const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please put in the author's name"],
        minLength: [3, "The author's name must be at least 3 characters."]
    }, 
    quote: {
        type: String, 
        required: [true, "The quote is a required field."],
        minLength: [3, "The quote must be at least 3 characters."]
    },
}, {timestamps: true});

const Author = new mongoose.model("Author", AuthorSchema);
module.exports = Author;