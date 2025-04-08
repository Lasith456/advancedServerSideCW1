import bcryptjs from 'bcryptjs';
import userDao from '../dao/userDao.js';

const apiKeyValidation = async (req, res, next) => {
    try {

            const email = req.email;
            const apikey = req.headers['x-api-key'];

            const user = await userDao.findUserByEmail(email);
            if(!user){
                return  res.status(400).json({success:false, message:"User Not Fpund!"});
            }
            const apiUser = await userDao.findUserByApiKey(user.id);

            const isAPIKeyValid = await bcryptjs.compare(apikey, apiUser.api_key);            
            if(!isAPIKeyValid){
                return res.status(400).json({success:false, message:"API Key is not valid!"});
            } 
            const currentTime = Date.now(); 
            const expiryTime = new Date(apiUser.expiresAt).getTime(); 
            if (expiryTime < currentTime) {
                return res.status(400).json({ success: false, message: "Your API Key is expired!" });
            }
            await userDao.updateApiKeyUsage(user.id);
            next();
        } catch (error) {
            console.error("Server Error:", error.message);
            return res.status(403).json({ message: "Server Error try again." });
        }
};

  
  export { apiKeyValidation };
  