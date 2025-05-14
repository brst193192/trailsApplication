import axios from "axios";
import { USERS_REQUEST_URL } from "./url";


export const login= async (email, password) =>{
    try {
        const result = await axios.get(USERS_REQUEST_URL+`login/${email}/${password}`);
        console.log(result.data);
        return result.data;
    }
    catch {
        console.log("מצטערים לא ניתן להתחבר לאתר");
        return null;
    }
}

export const register = async (user) => {
    try {
        const result = await axios.post(USERS_REQUEST_URL+"register",{...user});
        console.log("נרשמת לאתר בהצלחה");
        console.log("המשתמש שהתחבר: ",result.data);
        return result.data;
    }
    catch {
        console.log("מצטערים לא ניתן להרשם לאתר, אין חיבור לשרת");
        return null;
    }
}