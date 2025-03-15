import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const IsUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            const { renewed, email } = await renewToken(req, res);
            if (renewed) {
                req.email = email;
                return next();
            }
            return res.status(403).json({ message: "Your session is expired, please login and try again." });
        }

        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Your session is expired, please login and try again." });
            }
            req.email = decoded.email;
            next();
        });

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: "Your session is expired, please login and try again." });
    }
};


const renewToken = (req, res) => {
    return new Promise((resolve) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return resolve({ renewed: false, email: null });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return resolve({ renewed: false, email: null });
            }

            const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '1m' });
            res.cookie("accessToken", newAccessToken, { maxAge: 60000, httpOnly: true });

            return resolve({ renewed: true, email: decoded.email });
        });
    });
};


export { IsUser };
