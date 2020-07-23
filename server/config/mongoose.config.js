const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authors', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("DB connection established."))
.catch(err => console.log("error", err))