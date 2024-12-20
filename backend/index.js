const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require('./routes')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Hello World"
    });
})

app.use("/api", router);

app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})