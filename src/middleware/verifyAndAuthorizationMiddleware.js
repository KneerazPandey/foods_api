import { verifyToken } from "./verifyTokenMiddleware.js";


export const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const user = req.user; 
        if (user.userType === 'Client' || user.userType === 'Vendor' || user.userType === 'Driver' || user.userType === 'Admin') {
            next();
        }else {
            return res.status(403).json({status: false, message: 'You are not authorized'});
        }
    });
}