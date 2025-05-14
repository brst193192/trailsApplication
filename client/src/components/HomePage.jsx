import { useState } from "react"
import { HotTrails } from "../fetaurs/trailsPages/HotTrails"
import { Button } from "@mui/material";

export const HomePage = () => {

    const [shotHotTrails,setShotHotTrails]=useState(false);
    return <>
        <h1>מסלולי הליכה לחובבי טיולים</h1>
        <div id="homePageDiv">
            <div>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>מבחר גדול</span>
                <p>מסלולים בכל רחבי הארץ</p>
            </div>
            <div>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>מתאים לכולם</span>
                <p>מסלולים בכל הרמות ולכל הגילאים</p>
            </div>
            <div>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>קל ונגיש</span>
                <p>כולל הדרכה מפורטת ותמונות נלוות</p>
            </div>
        </div>
        <Button style={{backgroundColor:"#8c8c8c", position:"sticky", top:"80%", right:"5%", opacity:"70%"}} variant="contained" disableElevation onClick={()=>setShotHotTrails(!shotHotTrails)}>{shotHotTrails?"סגירה":"לצפייה בטיולים החמים ביותר"}</Button>
        {shotHotTrails&& <HotTrails/>}
    </>
}