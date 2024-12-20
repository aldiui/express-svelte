const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const login = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            succes: false,
            message: "Validation error",
            errors: errors.array() 
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "User not found",
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                succes: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json({
            succes: true,
            message: "Login successfully",
            data: {
                user: userWithoutPassword,
                token,
            },
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
    login,
}
