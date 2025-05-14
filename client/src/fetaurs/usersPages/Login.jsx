import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setAllCurrentfavorites, setAllCurrentTrails, setCurrentUser } from "./usersListSlice";
import { login } from "../../api/usersApi";
import { getFavoritesFromServer } from "../../api/favoritesApi";

//mui-imports
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export const Login=()=>{

    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    
    const trails=useSelector(state=>state.trails.trails);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const loginToApp = async () => {
        const user = await login(email, password);
            if(!user){
                alert("מצטערים אינך משתמש רשום באפליקציה שלנו,\n אנו מעבירים אותך לרישום למערכת")
                navigate("/register"); 
            }
            else{
                console.log(user);
                alert("שלום לך "+user.firstName+" "+user.lastName+ " התחברת בהצלחה! ");
                dispatch(setCurrentUser(user));
                navigate("/trails"); 

                //עדכון רשימות המועדפים ורשימת הטיולים שלי
                let currentTrails=[];
                if(trails!=null)
                    currentTrails=trails.filter(t=>t.userId==user.id);
                dispatch(setAllCurrentTrails(currentTrails));

                const favoriteTrails=await getFavoritesFromServer(user.id);
                console.log("favoriteTrails: ",favoriteTrails);
                if(favoriteTrails!=null)
                    dispatch(setAllCurrentfavorites(favoriteTrails));
            }  
    }

    const setAddress=(e)=>{
        const value=e.target.value;
        if(value[value.length-1]=='*')
            e.target.value=value.substring(0,value.length-1)+"@gmail.com";
        setEmail(e.target.value);
    }
    const setPass=(e)=>{
        const value=e.target.value;
        if(value[value.length-1]=='*')
            e.target.value=value.substring(0,value.length-1)+"1234";
        setPassword(e.target.value);
    }

    return<>
        <div className="form">
            <h2>התחברות</h2>
            <TextField style={{direction:"ltr"}} label="אימייל" variant="outlined" title="@gmail.com לחץ על * להשלמה אוטומטית של" 
                    type={email} onChange={(e)=>{setAddress(e)}}/>
            <TextField style={{direction:"ltr"}} label="סיסמא" variant="outlined" type={password} title="הסיסמא צריכה לכלול 4 תווים לפחות" 
                    onChange={(e)=>setPass(e)}/>
            <Button style={{backgroundColor:"#8c8c8c"}} variant="contained" disableElevation onClick={()=>loginToApp()}>התחברות</Button>
            <Button style={{borderColor:"#8c8c8c", color:"#8c8c8c"}} variant="outlined" disableElevation onClick={()=>navigate("../register")}>עוד לא מחובר למערכת?</Button>
        </div>
    </>
}