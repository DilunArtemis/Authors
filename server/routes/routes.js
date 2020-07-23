const controller = require('../controllers/author.controller');

module.exports = function(app){
    app.get('/api/authors', controller.allAuthors);
    app.get('/api/authors/:id', controller.oneAuthor);
    app.post('/api/authors', controller.newAuthor);
    app.patch('/api/authors/:id', controller.editAuthor);
    app.delete('/api/authors/:id', controller.deleteAuthor);
}