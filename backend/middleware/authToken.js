const jwt = require('jsonwebtoken');

const authToken = async(req, res, next)=> {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err);
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            if (!decoded || !decoded._id) {
                return res.status(401).json({
                    message: "Token invalid, user not found",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded._id;
            next();
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
