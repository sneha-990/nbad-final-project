const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://52.203.126.57/', 'http://172.26.11.81/'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
