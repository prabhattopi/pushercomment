const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Pusher = require("pusher");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const port = 5000;

// Initialize our pusher
const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    encrypted: true
});

app.post("/comment", (req, res) => {
    console.log(req.body);
    const newComment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    pusher.trigger("pusherchat", "new_comment", newComment);
    res.json({ created: true });
});

app.use(function (req, res, next) {
    var error404 = new Error("Route not found");
    error404.status = 404;
    next(error404);
});

app.listen(port, () => console.log("hello server started"));
