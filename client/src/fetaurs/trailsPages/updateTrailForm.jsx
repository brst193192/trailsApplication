import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateTrailInServer } from "../../api/trailsApi";
import { updateTrailInStore } from "./trailsSlice";
import { updateAllListsOfTrailsInStore } from "../usersPages/usersListSlice";
import * as React from 'react';
import { Button, TextareaAutosize as BaseTextareaAutosize} from "@mui/material";
import { styled } from '@mui/system';

export const UpdateTrailForm = () => {
    const allTrails = useSelector((state) => state.trails.trails);
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = param.trailId;
    const [trail, setTrail] = useState(null);

    // params-שליפת הטיול הנוכחי מהסטור לפי קוד שהתקבל ב
    useEffect(() => {
        if (allTrails && !trail)
            allTrails.forEach(t => {
                if ("" + t.id === id) {
                    setTrail(t);
                    console.log("old trail", t);
                }
            });
    }, []);

    const setData = (value, name) => {
        const updTrail = { ...trail };
        updTrail[name] = value;
        setTrail(updTrail);
    }

    const sendUpdTrail = async () => {
        const success = await updateTrailInServer(trail);
        if (success) {
            dispatch(updateTrailInStore(trail));
            //כאן הוא לא מצליח לעדכן כי המערכים הם אובייקט של פרוקסי
            dispatch(updateAllListsOfTrailsInStore(trail));
            console.log("update trail", trail);
            navigate("/trails");
        }
    }

    return <>
        {trail &&
            <div className="form">
                <h2>עדכון פרטי מסלול</h2>
                <label>שם מסלול</label>
                <TextareaAutosize name="name" defaultValue={trail.name} onChange={(e) => setData(e.target.value, e.target.name)} type="text" />
                <label>תיאור קצר</label>
                <TextareaAutosize name="description" defaultValue={trail.description} onChange={(e) => setData(e.target.value, e.target.name)} type="text" />
                <label>פירוט</label>
                <TextareaAutosize name="moreInfo" defaultValue={trail.moreInfo} onChange={(e) => setData(e.target.value, e.target.name)} type="text" />
                <label>דרכי הגעה</label>
                <TextareaAutosize name="howToCome" defaultValue={trail.howToCome} onChange={(e) => setData(e.target.value, e.target.name)} type="text" />
                <img src={"../"+trail.src} alt="תמונה של המקום"/>
                <Button style={{backgroundColor:"#8c8c8c"}} variant="contained" onClick={() => sendUpdTrail()}>עדכן</Button>
            </div>
        }
    </>
}

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 30vw;
    min-height:2rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);