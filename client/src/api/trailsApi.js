import axios from "axios";
import { TRAILS_REQUEST_URL } from "./url";


export const getAllTrailsFromServer = async () => {
    try {
        const result = await axios.get(TRAILS_REQUEST_URL + "getAll");
        console.log("רשימת הטיולים נשלפה בהצלחה מהשרת", result.data);
        return result.data;
    }
    catch 
    { 
        console.log("לא הצלחנו לשלוף את רשימת הטיולים מהשרת");
        return null;
    }
}

export const addTrailToServer = async (trail) => {
    try {
        debugger
        const result = await axios.post(TRAILS_REQUEST_URL + "add", {...trail});
        console.log("המסלול נוסף בהצלחה לשרת", result.data);
        return result.data;
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו להוסיף את המסלול לשרת");
    }
}

export const updateTrailInServer = async (trail) => {
    try {
        const result = await axios.put(TRAILS_REQUEST_URL + "update/", trail)
        return true;
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו לעדכן את פרטי המסלול בשרת");
        return false;
    }

}

export const deleteTrailInServer = async (id) => {
    try {
        const result = await axios.delete(TRAILS_REQUEST_URL+`delete/${id}`);
        return true;
    }
    catch (e) {
        console.log("שגיאה! לא הצלחנו למחוק את המסלול מהשרת");
        return false;
    }

}


