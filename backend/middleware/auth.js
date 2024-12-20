const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ 
        succes: false,
        message: 'Unauthenticated.' 
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ 
            succes: false,
            message: 'Invalid token' 
        });
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;