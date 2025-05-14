import axios from "axios";
import { FAVORITES_REQUEST_URL } from "./url";

export const getFavoritesFromServer = async (userId) => {
    try {   
        //https://localhost:7096/favorites/getMyFavorites/{userId}
        const result=await axios.get(FAVORITES_REQUEST_URL+`getMyFavorites/${userId}`);
        return result.data;  
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו לשלוף את המועדפים שלך מהשרת");
        return null;
    }
}

export const getHotTrailsFromServer = async () => {
    try {   
        //https://localhost:7096/favorites/hotTrails
        const result=await axios.get(FAVORITES_REQUEST_URL+"hotTrails");
        return result.data;  
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו לשלוף את הטיולים החמים שלך מהשרת");
        return null;
    }
}

export const changefavoriteStatusInServer = async (userId, trailId) => {
    try {   
        //https://localhost:7096/favorites/changeStatus/{userId}/{trailId}
        const result=await axios.put(FAVORITES_REQUEST_URL+`changeStatus/${userId}/${trailId}`);
        return true;  
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו לשלוף את המועדפים שלך מהשרת");
        return false;
    }
}