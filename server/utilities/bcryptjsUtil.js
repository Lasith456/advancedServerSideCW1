import bcryptjs from 'bcryptjs';
const genarateHash=async(string)=>{
    const saltRounds=10;
    const hashedandsaltedpassword=await bcryptjs.hash(string,saltRounds)
    return hashedandsaltedpassword;
}
export { genarateHash };