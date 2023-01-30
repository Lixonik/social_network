import jwt from 'jsonwebtoken'
import config from '../config.json' assert {type: 'json'}

export default (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = (req.headers.authorization).split(' ')[1]
        console.log(token)
        // console.log(token)
        if (!token) {
            return res.status(403).json({ message: "User is not authorized" })
        }

        const decodedData = jwt.verify(token, config["secret"])
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "User is not authorized" })
    }
}
