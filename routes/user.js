const express = require('express');
const https = require('https'); // Import the https module
const router = express.Router();
require('dotenv').config();

const { login, signup } = require('../controllers/Auth');
const { auth } = require('../middleware/auth');
const getCharts = require('../controllers/getCharts');

router.post('/login', login);
router.post('/signup', signup);

router.get('/dashboard', auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the dashboard',
        user: req.user, // You can attach user details in the `auth` middleware
    });
});

router.get('/nifty_sensex', (req, res) => {
    //console.log(process.env.API_SECRET);
    const options = {
        method: 'GET',
        hostname: 'yahoo-finance15.p.rapidapi.com',
        port: null,
        path: '/api/v1/markets/stock/quotes?ticker=%5EBSESN%2C%5ENSEI',
        headers: {
            'x-rapidapi-key': `${process.env.API_SECRET}`,
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
    };

    const request = https.request(options, function (response) {
        const chunks = [];

        // Collect data chunks
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });

        // Process the response when fully received
        response.on('end', function () {
            const body = Buffer.concat(chunks).toString(); // Convert buffer to string
            try {
                const jsonResponse = JSON.parse(body); // Parse string to JSON
                //console.log('Fetched Data from Yahoo Finance:', JSON.stringify(jsonResponse, null, 2)); // Log formatted JSON on server side
                res.json(jsonResponse); // Send the JSON response to the frontend
            } catch (error) {
                console.error('Failed to parse JSON:', error.message);
                res.status(500).send({ error: 'Invalid JSON response from Yahoo Finance API' });
            }
        });
    });

    // Handle errors
    request.on('error', (err) => {
        console.error(`Error: ${err.message}`);
        res.status(500).send({ error: 'Failed to fetch stock data' });
    });

    request.end(); // End the request
});


//requestforspecificcompanies
router.get('/topCompanies', (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'yahoo-finance15.p.rapidapi.com',
        port: null,
        path: '/api/v1/markets/stock/quotes?ticker=HDFCBANK.NS,INFY.NS,TCS.NS,ONGC.NS,HINDUNILVR.NS,GOLDBEES.NS',
        headers: {
            'x-rapidapi-key': `${process.env.API_SECRET}`,
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
    };

    const request = https.request(options, function (response) {
        const chunks = [];

        // Collect data chunks
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });

        // Process the response when fully received
        response.on('end', function () {
            const body = Buffer.concat(chunks).toString(); // Convert buffer to string
            try {
                const jsonResponse = JSON.parse(body); // Parse string to JSON

                // Extract relevant data
                const companiesData = jsonResponse.body; // Access the body array
                const currentMarketPrices = [];
                const previousMarketPrices = [];
                const changes = [];
                const percentChanges = [];

                companiesData.forEach((company) => {
                    currentMarketPrices.push(company.regularMarketPrice);
                    previousMarketPrices.push(company.regularMarketPreviousClose);
                    changes.push(company.regularMarketChange);
                    percentChanges.push(company.regularMarketChangePercent.toFixed(1));
                });

                // Send the extracted data to the frontend
                res.json({
                    currentMarketPrices,
                    previousMarketPrices,
                    changes,
                    percentChanges,
                });
            } catch (error) {
                console.error('Failed to parse JSON:', error.message);
                res.status(500).send({ error: 'Invalid JSON response from Yahoo Finance API' });
            }
        });
    });

    // Handle errors
    request.on('error', (err) => {
        console.error(`Error: ${err.message}`);
        res.status(500).send({ error: 'Failed to fetch stock data' });
    });

    request.end(); // End the request
});

//requestforchartdata
router.get('/chartData', getCharts);


//protected Route
module.exports = router;
