const express = require('express');
const cors = require('cors');

const app = express();

require('./config/mongoose.config');

app.use(
    cors(),
    express.json(),
    express.urlencoded({extended:true})
)

require('./routes/routes')(app);

app.listen(8000, () => {
    console.log("listening on port 8000...");
})