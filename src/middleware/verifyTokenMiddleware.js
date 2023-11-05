import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({status: false, message: '401 Unauthorized'});
    }

    const datas = authHeader.split(' ');
    if (datas.length !== 2) {
        return res.status(401).json({status: false, message: 'Invalid Tokens'});
    }

    const tokenHeader = datas[0];
    const token = datas[1];

    if (tokenHeader !== 'Bearer') {
        return res.status(401).json({status: false, message: 'Invalid Tokens Headers'});
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({status: false, message: 'Invlalid Token'});
        }

        req.user = user;
        next();
    });
}