import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router";
import { addNewTrail } from "./trailsSlice";
import { addCurrentTrail } from "../usersPages/usersListSlice";
import { addTrailToServer } from "../../api/trailsApi";
//mui imports
import * as React from 'react';
import { styled } from '@mui/system';
import { Button, TextareaAutosize as BaseTextareaAutosize, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const AddTrail = () => {
  const DEFAULT_SRC = "images/defaultImg.png";

  const currentUser = useSelector(state => state.users.currentUser == null ? null : state.users.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trailName, setTrailName] = useState("");
  const [description, setDesc] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [howToCome, setHowToCome] = useState("");
  // const [src, setSrc] = useState("");

  const newTrail = async () => {
    //בדיקות תקינות
    if (trailName.length < 3) {
      alert("שם מסלול קצר מדי");
      return;
    }
    if (description.length < 5) {
      alert("תאור מסלול קצר מדי");
      return;
    }
    if (moreInfo.length < 5) {
      alert("הפירוט על המסלול קצר מדי");
      return;
    }
    if (howToCome.length < 5) {
      alert("נא לפרט יותר על דרכי ההגעה");
      return;
    }
    // if (src.indexOf(".") == -1 || (src.indexOf("jpg") == -1 && src.indexOf("png") == -1)) {
    //   alert("יש להעלות תמונות מסוג\njpg\n או מסוג\n png\n !בלבד");
    //   return;
    // }
    let newTrail = {
      name: trailName,
      src: DEFAULT_SRC,
      description: description,
      moreInfo: moreInfo,
      howToCome: howToCome,
      userId: currentUser.id,
    }
    debugger
    //הוספת הטיול החדש לשרת, לרשימת הטיולים ולרשימת הטיולים של המשתמש הנוכחי
    newTrail = await addTrailToServer(newTrail);
    if (newTrail != null) {
      dispatch(addNewTrail(newTrail));
      dispatch(addCurrentTrail(newTrail));
      console.log("המסלול נוסף בהצלחה לרשימת המסלולים\nהנך מועבר לרשימת המסלולים המעודכנת");
      navigate("../trails");
    }
  }

  return <>
    {currentUser
      ?
      <div className="form">
        <h2>הוספת מסלול</h2>
        <div>
          <label>שם מסלול</label>
          <TextareaAutosize onChange={(e) => setTrailName(e.target.value)} type="text" />
        </div>
        <div>
          <label>תיאור קצר</label>
          <TextareaAutosize onChange={(e) => setDesc(e.target.value)} type="text" />
        </div>
        <div>
          <label>פירוט</label>
          <TextareaAutosize onChange={(e) => setMoreInfo(e.target.value)} type="text" />
        </div>
        <div>
          <label>דרכי הגעה</label>
          <TextareaAutosize onChange={(e) => setHowToCome(e.target.value)} type="text" />
        </div>
        <Button
          style={{ backgroundColor: "#8c8c8c" }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon style={{ margin: "0rem 0.5rem" }} />}>
          העלאת תמונה
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>

        <Button style={{ marginBottom: "4rem", backgroundColor: "#8c8c8c" }} variant="contained" onClick={() => newTrail()}>הוסף</Button>
      </div>
      :
      <div id="allCardsDiv">
        <div className="grid">
          <p>מצטערים! אין לך הרשאה להוסיף מסלול, לשם כך עליך להתחבר למערכת</p>
        </div>
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
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});