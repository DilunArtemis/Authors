const Author = require('../models/author');

module.exports = {
    allAuthors: (req,res) => {
        Author.find({})
            .then(authors => res.json({message: "success", results: authors}))
            .catch(err => res.json({messsage: "error", results: err}))
    },
    oneAuthor: (req, res) => {
        Author.findOne({_id: req.params.id})
            .then(author => res.json({message: "success", results: author}))
            .catch(err => res.json({message: "errors", results: err}));
    },
    newAuthor: (req,res) => {
        Author.create(req.body)
            .then(author => res.json({message: "success", results: author}))
            .catch(err => res.json({message: "error", results: err}));
    },
    editAuthor: (req,res) => {
        Author.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true })
        .then(author => res.json({message: "success", results: author}))
        .catch(err => res.json({message: "errors", results: err}));
    },
    deleteAuthor: (req, res) => {
        Author.findOneAndDelete({_id: req.params.id})
            .then(author => res.json ({message: "success", results: author}))
            .catch(err => res.json({message: "error", resutls: err}));
    }
}