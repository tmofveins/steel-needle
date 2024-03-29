const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const PORT = 3500;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "PATCH"],
    allowedHeaders: "Content-Type",
}
app.use(cors(corsOptions));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use("/songs", require("./routes/songRoutes"));

// 404 page handling for invalid routes
app.all("*", (req, res) => {
    res.status(404);

    // if html request, show html page
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    // if from json, send 404 response
    } else if (req.accepts("json")) {
        res.json({
            message: "404 Not Found",
        });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));