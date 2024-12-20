const express = require('express');
const prisma = require('../prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const findUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
        
        return res.status(200).json({
            succes: true,
            message: "Get all users successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Internal server error",
            errors: error 
        });
    }
}

const createUser = async (req, res) => {
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
        });
        return res.status(201).json({
            succes: true,
            message: "User created successfully",
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

const findUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            succes: true,
            message: `Get user with id ${id} successfully`,
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

const updateUser = async (req, res) => {
    const { id } = req.params;
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
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        return res.status(200).json({
            succes: true,
            message: `User with id ${id} updated successfully`,
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

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(200).json({
            succes: true,
            message: `User with id ${id} deleted successfully`,
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
    findUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
}