const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authentication = require('../../middleware/authentication');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/Users');


//GET USER
router.get('/', authentication, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select('-password');
        if (!user) {
            return response.status(401).json({
                errors: [{
                    msg: `Invalid credentials`,
                    param: "login fields",
                    location: "body"
                }]
            })
        }

        response.json(user);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send('Server error');
    }
})

//LOGIN USER
router.post('/', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email });

        //CHECK EMAIL
        if (!user) {
            return response.status(401).json({
                errors: [{
                    msg: `Invalid credentials`,
                    param: "login fields",
                    location: "body"
                }]
            })
        }

        //CHECK PASSWORD
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return response.status(401).json({
                errors: [{
                    msg: `Invalid credentials`,
                    param: "login fields",
                    location: "body"
                }]
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: 36000 },
            (error, token) => {
                if (error) throw error
                response.json({ token });
            }
        )
    } catch (error) {
        console.log(error.message);
        response.status(500).send('Server error');
    }
})

//CREATE USER
router.post(
    '/register',
    async (request, response) => {
        
        const { name, email, password } = request.body;
        try {
            let user = await User.findOne({ email });

            //CHECK IS EMAIL IS EXISTING
            if (user) {
                return response.status(401).json({
                    errors: [{
                        msg: `${email} is already taken`,
                        param: "name",
                        location: "body"
                    }]
                });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 36000 },
                (error, token) => {
                    if (error) throw error
                    response.json({ token });
                }
            )
        } catch (error) {
            console.log('error');
            console.log(error.message);
            response.status(500).send('Server error');
        }
    })

module.exports = router;