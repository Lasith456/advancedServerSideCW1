import dotenv from 'dotenv';

dotenv.config();
const getAllCountry = async (req, res) => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/name/india");
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("Error in getAllCountry:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};



// const login = async (req, res) => {
//     try {
//         const { email,password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const user = await userDao.findUserByEmail(email);
//         const isPasswordValid = await bcryptjs.compare(password, user.password);
//         if (!isPasswordValid) {
//           return res.status(404).json({ success: false, message: "Invalid credentials" });
//         }
//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1m' });
//         const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m' });
//         res.cookie("accessToken", token, {maxAge: 60000});
//         res.cookie("refreshToken", refreshToken, {httpOnly: true,secure: true, sameSite: "strict",maxAge: 300000});
//         res.status(201).json({ success: true, message: "User Login successfully", user });
//     } catch (error) {
//         console.error("Error in register:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };
export { getAllCountry};