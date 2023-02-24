const User = require('../models/user.model')
const ResetPasswordToken = require('../models/resetPasswordToken.model')
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const transporter = require('../../config/nodemail.config');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const AuthController = {
    signin: async (req, res) => {
        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).send({error: 'User not found'})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare) {
            return res.status(401).send({error: 'Password is incorrect'})
        }

        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.send({accessToken})
    },
    signup: async  (req, res) => {
        const { email, password } = req.body

        const hash = await bcrypt.hash(password, salt);
        
        const user = new User({
            email,
            password: hash,
        })

        try {
            await user.save()
            res.send(user)

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: user.email,
                subject: 'Sending Email using Node.js',
                text: `Welcome ${user.email} to my website`
            };
        
            await transporter.sendMail(mailOptions);
        } catch (error) {
            res.status(500).send({error: error.message})
        }  
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body
        // Si l'utilisateur existe
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).send({error: 'User not found'})
        }
        // Générer un token
        const token = crypto.randomBytes(20).toString('hex');
        console.log(token)
        // Sauvegarder le token dans la base de données
        const resetPasswordToken = new ResetPasswordToken({
            token,
            user: user._id
        })
        await resetPasswordToken.save()
        // Envoyer un mail avec le token
        const mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            html: `
                <h1>Reset your password</h1>
                <p>Click on the link below to reset your password</p>
                <a href="http://localhost:3000/reset-password/${token}">Reset password</a>
            `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.status(200).send({message: 'Email sent: ' + info.response});
            }
        });
    },
    resetPassword: async (req, res) => {
        // Récupérer le token
        // Récupérer le password
        const { token, password } = req.body
        const resetPasswordToken = await ResetPasswordToken.findOne({token})
        if(!resetPasswordToken) {
            return res.status(404).send({error: 'Token not found'})
        }
        // Récupérer l'utilisateur
        const user = await User.findById(resetPasswordToken.user)
        console.log(user)
        const hash = await bcrypt.hash(password, salt);
        user.password = hash
        await user.save()

        const mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            html: `
                <h1>Password updated</h1>
                <p>Your password has been updated</p>
                <a href="http://localhost:3000/auth/login">Login</a>
            `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.status(200).send({message: 'Password updated'})
            }
        });

        // Delete resetPasswordToken
        await ResetPasswordToken.findByIdAndDelete(resetPasswordToken._id)
    }
}

module.exports = AuthController