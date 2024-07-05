const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();
app.use(cors());
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.json({ "test": "This is an api for food delivery app" });
});

app.get("/api/restaurants", async(req, res) => {
    try {
      const { lat, lng } = req.query;
    console.log(lat, lng);

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });
        res.json(response);
    
    } catch (error) {
        res.status(400).json(error);
    }
    
})
