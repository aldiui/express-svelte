const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

const register = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            succes: false,
            message: "Validation error",
            errors: errors.array() 
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword,
            },
        })       
        
        return res.status(201).json({
            succes: true,
            message: "Register successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Internal server error",
            errors: error 
        });
    }
}

module.exports = {
    register,
}