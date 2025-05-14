import { useState } from "react";
import { useDispatch } from "react-redux";
import { Await, useNavigate } from "react-router";
import { setAllCurrentfavorites, setAllCurrentTrails, setCurrentUser } from "./usersListSlice";
import { register } from "../../api/usersApi";
//mui imports
import { Button, TextField } from "@mui/material";

export const Registration = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const regist = async () => {
        if (firstName.length < 2) {
            alert("שם פרטי לא תקין");
            return;
        }
        if (lastName.length < 2) {
            alert("שם משפחה לא תקין");
            return;
        }
        const x = email.indexOf('@'), y = email.indexOf('.');
        if (x < 1 || y === -1 || y < x + 2 || email.length < 5 || y === email.length - 1) {
            alert("כתובת אימייל לא תקינה");
            return;
        }
        if (password.length < 4) {
            alert("סיסמא לא תקינה,\nהסיסמא צריכה להיות לכל הפחות באורך 4 תוים");
            return;
        }
        let newUser = { id: 0, firstName: firstName, lastName: lastName, email: email, password: password, status: 1, favoriteTrails: [] };
        //sql-כדי שיהיה לו קוד משתמש אוטומטי מהשרת ומה
        newUser = await register(newUser);
        if(newUser) {
            dispatch(setCurrentUser(newUser));
            dispatch(setAllCurrentTrails([]));
            dispatch(setAllCurrentfavorites([]));
            alert("שלום לך " + firstName + " " + lastName + "\n שמחים בהצטרפותך לרשימת החברים באתר\n הנך מועבר לרשימת המסלולים");
        }
        else{
            alert("שגיאה! לא הצלחנו לחבר אותך לאתר\nהנך מועבר לרשימת הטיולים")            
        }
        navigate("../trails");
    }

    const setEmailAdress = (e) => {
        const value = e.target.value;
        if (value[value.length - 1] == '*')
            e.target.value = value.substring(0, value.length - 1) + "@gmail.com";
        setEmail(e.target.value);
    }
    const setPass = (e) => {
        const value = e.target.value;
        if (value[value.length - 1] == '*')
            e.target.value = value.substring(0, value.length - 1) + "1234";
        setPassword(e.target.value);
    }

    return <>
        <div className="form">
            <h2>הרשמה</h2>
            <TextField label="שם פרטי" variant="outlined" onChange={(e) => setFirstName(e.target.value)} type={Text} />
            <TextField label="שם משפחה" variant="outlined" onChange={(e) => setLastName(e.target.value)} type={Text} />
            <TextField label="אימייל" style={{ direction: "ltr" }} variant="outlined" title="@gmail.com לחץ על * להשלמה אוטומטית של"
                type={email} onChange={(e) => { setEmailAdress(e) }} />
            <TextField label="סיסמא" style={{ direction: "ltr" }} type={password} title="הסיסמא צריכה לכלול 4 תווים לפחות"
                onChange={(e) => setPass(e)} />
            <Button style={{ backgroundColor: "#8c8c8c" }} variant="contained" onClick={() => regist()}>להרשמה</Button>
            <Button style={{ borderColor: "#8c8c8c", color: "#8c8c8c" }} variant="outlined" onClick={() => navigate("../login")}>כבר מחובר למערכת?</Button>
            <br/>
        </div>
    </>
}