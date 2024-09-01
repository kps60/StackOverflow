import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorisation?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        let decodeData = jwt.verify(token, process.env.JWT_SECRECT)
        req.userId = decodeData?.id
        next()
    } catch (error) {
        console.log(error.message)
    }
}

export default auth;