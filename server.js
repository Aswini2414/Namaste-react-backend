const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
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
    console.log(req.body);
    console.log(lat, lng, count);

    const url = "https://www.swiggy.com/dapi/restaurants/list/update";

    const requestData = {
      lat,
      lng,
      nextOffset: "CJhlELQ4KIDI6L3Z+/1fMKcTOAE=",
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
      _csrf: "ORQ7BAsCWsIj-xqLVDgw5OIojGI_4ZdTV3VqRAV8",
    };
    console.log(requestData);

    const response = await axios.post(url, requestData);
    console.log(response);
    const apidata = response.data;
    console.log(apidata);
    res.json(apidata);
  } catch (error) {
    res.status(400).json(error);
  }
}
);

app.get("/api/mindFoodRestaurants", async (req, res) => {
  try {
    const { itemId, item } = req.query;
    console.log(itemId, item);
    const url =
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&collection=${Number(itemId)}&tags=layout_CCS_${item}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
    const mindFoodRest = await axios.get(url, {
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Cookie":
          "__SW=4A9pX8ZcMEjpv_Vir_wsPZi6x8K80PSp; _device_id=9ab785da-e861-0b30-65c1-1dfb65e85d11; userLocation={%22lat%22:%2216.30070%22%2C%22lng%22:%2280.46390%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _gcl_au=1.1.323027785.1720247552; _gid=GA1.2.723411596.1720445219; _guest_tid=4b423a4b-18dd-4b24-b293-882770678dd0; _sid=euz255a8-b7ab-4271-afc0-ebce223febd5; _ga=GA1.2.2088847275.1720247552; _ga_34JYJ0BCRN=GS1.1.1720506015.5.1.1720506035.0.0.0; _gat_UA-53591212-4=1; _ga_4BQKMMC7Y9=GS1.2.1720506034.2.1.1720506151.60.0.0",
        "Dnt": "1",
        "Pragma": "no-cache",
      }
    })
    console.log(mindFoodRest);
    const data = mindFoodRest.data;
    console.log(data);
    res.status(200).json(data);
    
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/api/mindFoodRestaurant", async (req, res) => {
  try {
    console.log("hi");
    const { lat,lng,resId } = req.query;
    console.log(lat, lng, resId);
    const url =
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${Number(resId)}`;
    
    const rest = await fetch(url, {
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Cookie":
          "__SW=4A9pX8ZcMEjpv_Vir_wsPZi6x8K80PSp; _device_id=9ab785da-e861-0b30-65c1-1dfb65e85d11; userLocation={%22lat%22:%2216.30070%22%2C%22lng%22:%2280.46390%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _gcl_au=1.1.323027785.1720247552; _gid=GA1.2.723411596.1720445219; _guest_tid=4b423a4b-18dd-4b24-b293-882770678dd0; _sid=euz255a8-b7ab-4271-afc0-ebce223febd5; _ga=GA1.2.2088847275.1720247552; _ga_34JYJ0BCRN=GS1.1.1720506015.5.1.1720506035.0.0.0; _gat_UA-53591212-4=1; _ga_4BQKMMC7Y9=GS1.2.1720506034.2.1.1720506151.60.0.0",
        "Dnt": "1",
        "Pragma": "no-cache",
        
      },
    });
    console.log(rest);

    const data = await rest.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
})

app.post("/api/mindFoodRestaurants/update", async (req, res) => {
  try {
    const requestData = req.body;
    const url = "https://www.swiggy.com/dapi/restaurants/list/update";

    console.log(requestData);

    const response = await axios.post(url, requestData, {
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length": JSON.stringify(requestData).length,
        "Cookie":
          "__SW=4A9pX8ZcMEjpv_Vir_wsPZi6x8K80PSp; _device_id=9ab785da-e861-0b30-65c1-1dfb65e85d11; fontsLoaded=1; _gcl_au=1.1.323027785.1720247552; _gid=GA1.2.723411596.1720445219; _guest_tid=9f028aec-58a0-4023-91b4-bdf8e5819151; _sid=ev38c1ad-c36f-49f0-9307-75e5acbd9ab8; _gat_0=1; dadl=true; _gat_UA-53591212-4=1; userLocation={%22lat%22:17.406498%2C%22lng%22:78.47724389999999%2C%22address%22:%22Hyderabad%2C%20Telangana%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga_4BQKMMC7Y9=GS1.2.1720517693.3.0.1720517693.60.0.0; _ga_34JYJ0BCRN=GS1.1.1720517657.6.1.1720517708.0.0.0; _ga=GA1.2.2088847275.1720247552",
        "Dnt": "1",
        "Origin": "https://www.swiggy.com",
        "Pragma": "no-cache",
        "Referer": "https://www.swiggy.com/",
        "Sec-Ch-Ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    });

    console.log(response);
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

// {
//       headers: {
//         "Accept" : "*/*",
//         "Accept-Encoding": "gzip, deflate, br",
//         "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache",
//         "Access-Control-Allow-Origin": "*",
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
//         "Content-Length": JSON.stringify(requestData).length,
//         "Cookie":
//           "__SW=4A9pX8ZcMEjpv_Vir_wsPZi6x8K80PSp; _device_id=9ab785da-e861-0b30-65c1-1dfb65e85d11; fontsLoaded=1; _gcl_au=1.1.323027785.1720247552; _gid=GA1.2.723411596.1720445219; _guest_tid=9f028aec-58a0-4023-91b4-bdf8e5819151; _sid=ev38c1ad-c36f-49f0-9307-75e5acbd9ab8; _gat_0=1; dadl=true; _gat_UA-53591212-4=1; userLocation={%22lat%22:17.406498%2C%22lng%22:78.47724389999999%2C%22address%22:%22Hyderabad%2C%20Telangana%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga_4BQKMMC7Y9=GS1.2.1720517693.3.0.1720517693.60.0.0; _ga_34JYJ0BCRN=GS1.1.1720517657.6.1.1720517708.0.0.0; _ga=GA1.2.2088847275.1720247552",
//         "Dnt": "1",
//         "Origin": "https://www.swiggy.com",
//         "Pragma": "no-cache",
//         "Referer": "https://www.swiggy.com/",
//         "Sec-Ch-Ua":
//           '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
//         "Sec-Ch-Ua-Mobile": "?0",
//         "Sec-Ch-Ua-Platform": '"Windows"',
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin",
//       },
//     }

