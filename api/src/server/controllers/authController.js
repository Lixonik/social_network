import database from "../../users.json" assert {type: 'json'};
import bcrypt from 'bcryptjs'
import path from 'path';
import fs from "fs";
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from '../config.json' assert {type: 'json'};

const SALT = 7;
const __dirname = path.resolve();
let authUsersData = database['users']

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, config["secret"], {expiresIn: "24h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration FAILED", errors})
            }
            const { email, password, surname, name, patronimyc, birthday } = req.body
            const candidate = authUsersData.findIndex(user => user['email'] === email)

            if (candidate !== -1) {
                // console.log(database)
                return res.status(400).json({message: 'A user with such an email already exists'})
            }

            const hashPassword = bcrypt.hashSync(password, SALT)
            const user = {
                id: JSON.stringify(authUsersData.length + 1),
                email: email,
                password: hashPassword,
                surname: surname,
                name: name,
                patronimyc: patronimyc,
                birthday: birthday,
                role: 'User',
                status: 'Not verified',
                news: [],
                friends: []
            }

            // console.log(typeof authUsersData, authUsersData)
            authUsersData.push(user)
            database['authUsersData'] = authUsersData
            console.log(database)
            // console.log(typeof authUsersData, authUsersData)

            fs.writeFile(path.join(__dirname, 'src','users.json'), JSON.stringify(database), 'utf-8', (err) => { if (err) console.log(err.message) })

            return res.json({message: 'User is successfully registered'})

        } catch(e) {
            res.status(400).json({message: e.message})
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = authUsersData.find(user => user['email'] === email)

            if (!user) {
                return res.status(400).json({message: `User with email ${email} not found`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = generateAccessToken(user.id, user.role)

            return res.json({ accessToken: token, name: user.name, surname:user.surname, patronimyc: user.patronimyc, email: user.email, birthday: user.birthday, role: user.role, status: user.status})
        } catch(e) {
            res.status(400).json({message: 'Login error'})
        }
    }
}

export default new AuthController()
