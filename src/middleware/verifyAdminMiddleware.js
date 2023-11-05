import { verifyToken } from "./verifyTokenMiddleware.js";


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        user = req.user; 

        if (user.userType === 'Admin') {
            next();
        }else {
            return res.status(403).json({status: false, message: 'You are not authorized'});
        }
    });
}