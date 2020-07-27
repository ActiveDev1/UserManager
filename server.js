const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const hostname = 'localhost'
const port = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    res.json({ message: "This is a simple of some api for manage user :) ." });
})
require("./routes/user.js")(app);
app.listen(port, hostname, () =>
    console.log(`Server running at http://${hostname}:${port}/`)
)