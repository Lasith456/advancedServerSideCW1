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
            res.status(500).json({ success: false, message: error.message });
        }
    }
};
const getSingleCountry = async (req, res) => {
    try {
        const name = req.body.countryName;
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("Error in getAllCountry:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};


export { getAllCountry,getSingleCountry};