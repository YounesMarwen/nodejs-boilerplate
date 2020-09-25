const express = require('express');
const app = express();

app.use(express.json());

// to avoid CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-origin', '*'); // or "*" => www.mywebsite.com
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// app.use('/products', productRoutes); EXP

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;