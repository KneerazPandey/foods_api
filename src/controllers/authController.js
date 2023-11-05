import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

import PasswordHashing from '../utils/password_hashing.js';


export const createUser = async (req, res) => {
    try {
        const user = req.body;
        //? Check if the user exists in firebase or not
        await admin.auth().getUserByEmail(user.email);
        //* Throwing error if user exists in firebase account
        return res.status(400).json({
            message: 'Email already registered'
        });
    }catch(error) {
        //* Creating new user if the user does not exists in firebase account
        if (error.code === 'auth/user-not-found') {
            try {
                //* Registering user in firebase
                const registeredUser = await admin.auth().createUser({
                    email: user.email,
                    password: user.password,
                    emailVerified: false,
                    disabled: false,
                });

                //* Creating user object in mongoose database
                const newUser = new User({
                    email: user.email,
                    username: user.password,
                    password: PasswordHashing.encrypt(user.password),
                    uid: registeredUser.uid,
                    userType: 'Client',
                });
                await newUser.save();

                return res.status(201).json({status: true});
            }catch(error) {
                return res.status(500).json({status: false, error: 'Error creating user'});
            }
        }

        return res.status(500).json({status: false, error: 'Error creating user'});
    }
}

export const loginUser = async (req, res) => {
    try{
        const data = req.body;
        //? Find the user by email from the mongoose database
        const user = await User.findOne({email: data.email});

        //* Throwing error if the user does not exists in mongoose database
        if (!user) {
            return res.status(401).json({'message': 'Wrong Credentials'});
        }

        const decryptedPassword = PasswordHashing.decrypt(user.password);

        //* Throwing error if the user password does not match
        if (decryptedPassword !== data.password) {
            return res.status(401).json({'message': 'Invalid email and password'});

        }

        //* Generating user tokens from user->id, user->userType and user->email
        const userToken = await jwt.sign({
            id: user._id,
            userType: user.userType,
            email: user.email,
        }, process.env.SECRET_KEY, {expiresIn: '21d'});

        const {email, password, ...other} = user._doc;

        return res.status(200).json({...other, userToken});
    }catch(error) {
        return res.status(400).json({'error': 'Error occured while loging user', status:false});
    }
}
