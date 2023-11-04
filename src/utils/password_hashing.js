import CryptoJS from "crypto-js";


class PasswordHashing {

    static encrypt = (password) => {
        return CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    }
    
    
    static decrypt = (encryptPassword) => {
        const decryptHash = CryptoJS.AES.decrypt(encryptPassword, process.env.SECRET_KEY);
        const decryptedPassword = decryptHash.toString(CryptoJS.enc.Utf8);

        return decryptedPassword;
    }
}

export default PasswordHashing;

