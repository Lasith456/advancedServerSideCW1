import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userDao from '../dao/userDao.js';

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
const IsAdmin = async (req, res, next) => {
    try {
      const email = req.email;
      if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized request." });
      }
      const user = await userDao.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "User Not Found!" });
      }
      if (user.userRole !== 1) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      req.role = user.userRole;
      next();
    } catch (error) {
      console.error("IsAdmin Middleware Error:", error.message);
      return res.status(500).json({ message: "Server error while checking role." });
    }
  };
  

  const renewToken = async (req, res) => {
    return new Promise(async (resolve) => {
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
        return resolve({ renewed: false, email: null });
      }
  
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) {
          return resolve({ renewed: false, email: null });
        }
        try {
          const user = await userDao.findUserByEmail(decoded.email);
          if (!user) {
            return resolve({ renewed: false, email: null });
          }
            const newAccessToken = jwt.sign(
            { email: user.email, role: user.userRole },
            process.env.JWT_SECRET,
            { expiresIn: '1m' }
          );
  
          res.cookie("accessToken", newAccessToken, {
            maxAge: 60000,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });
  
          return resolve({ renewed: true, email: user.email });
        } catch (error) {
          console.error("Error during token renewal:", error.message);
          return resolve({ renewed: false, email: null });
        }
      });
    });
  };
  


export { IsUser,IsAdmin };
