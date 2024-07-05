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

app.get("/api/restaurants", async (req, res) => {
    try {
        const { lat, lng } = req.query;

        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    
    } catch (error) {
        res.status(400).json(error);
    }
    
});

app.post("/api/restaurants/update", async (req, res) => {
    try {
        const { lat, lng, count } = req.body;
        console.log(lat, lng, count);

        const url = "https://www.swiggy.com/dapi/restaurants/list/update";

        const requestData = {
          lat: lat,
          lng: lng,
          nextOffset: "CJhlELQ4KIDglJfcwZfeFzCnEzgE",
          widgetOffset: {
            NewListingView_category_bar_chicletranking_TwoRows: "",
            NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
            Restaurant_Group_WebView_PB_Theme: "",
            Restaurant_Group_WebView_SEO_PB_Theme: "",
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: count,
            inlineFacetFilter: "",
            restaurantCountWidget: "",
          },
          filters: {},
          seoParams: {
            seoUrl: "https://www.swiggy.com/",
            pageType: "FOOD_HOMEPAGE",
            apiName: "FoodHomePage",
          },
          page_type: "DESKTOP_WEB_LISTING",
          _csrf: "797kayyYPv8e-85PDoCOhUOhO3-JepX0vY5wku94",
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          },
          body: JSON.Stringify(requestData),
        });

        console.log(response);
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);

    } catch (error) {
      res.status(400).json(error);
    }
})
