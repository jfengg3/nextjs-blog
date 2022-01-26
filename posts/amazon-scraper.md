---
title: "Creating an API from scratch"
date: "2022-01-07"
---

Source: [Amazon SG Scraper API](https://github.com/jfengg3/amazonsg-scrapper)

Hosted On: [Heroku](https://github.com/jfengg3/amazonsg-scrapper)

Test API endpoint: [RapidAPI Endpoints](https://rapidapi.com/jfengg3/api/amazon-sg-scrapper/)

---

API, or application programming interface is a connection between computers or between computer programs. It facilitates the sending requests and receiving responses.

Most APIs are RESTful API, they follow a set of architectural constraints and that is a representation of the state of the resource to the requester or endpoint.

URIs, or uniform resource identifiers are designed to communicate with the REST API's resource model. An example: (http://api.example.com/**louvre**/)

---

## Amazon SG Scraper

I will be creating a simple API from scratch for Amazon SG that will do the following:

- Retrieve product details
- Retrieve product reviews
- Retrieve product offers
- Search for products

To start off, create a new folder for the project. In, in the directory you will want to create a **_package.json_** file

```
> npm init -y
```

Next, we will require the following modules, **_Express_**, **_Request-Promise_** and **_Nodemon (Optional)_**

```
> npm install express request-promise nodemon
```

#### Let's begin building the API. First, we setup the modules we need.

```
> const express = require('express');
> const request = require('request-promise'); // Use to call API-requests

> const app = express();
> const PORT = process.env.PORT || 5000; // Port number is up to you
```

#### You will require to have your own [ScraperAPI](https://www.scraperapi.com/) api key. We will use this to scrap the amazon website.

```
// Function to take in user's own API key from ScraperAPI
> const scraper_url = (api_key) =>
`http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

> app.use(express.json());

> app.get('/', (req, res) => {
    res.send('Amazon SG Scrapper API');
  });
```

#### Retrieve product details

```
> app.get('/products/:productId', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}
        &url=https://www.amazon.sg/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

  });
```

#### Retrieve product reviews

```
> app.get('/products/:productId/reviews', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}
        &url=https://www.amazon.sg/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

  });
```

#### Retrieve product offers

```
> app.get('/products/:productId/offers', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}
        &url=https://www.amazon.sg/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

  });
```

#### Search for products

```
> app.get('/search/:searchQuery', async (req, res) => {

    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}
        &url=https://www.amazon.sg/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

  });
```

#### Just to make sure the server is running fine

```
> app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
