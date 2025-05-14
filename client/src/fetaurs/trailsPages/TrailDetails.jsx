import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router"

export const TrailDetails = () => {
    const allTrails = useSelector((state) => state.trails.trails);
    const param = useParams();

    const id = param.trailId;
    let thisTrail;

    // params-שליפת הטיול הנוכחי מהסטור לפי קוד שהתקבל ב
    if (allTrails)
        allTrails.forEach(t => {
            if ("" + t.id === id)
                thisTrail = t;
        });

    return <>
        {thisTrail &&
            <div>
                <div id="trailDetailsDiv">
                    <img alt="תמונה של המקום" src={"../" + thisTrail.src} />
                    <div>
                        <h1>{thisTrail.name}:</h1>
                        <h2>{thisTrail.description}</h2>
                        <br />
                        <p>{thisTrail.wayInTrail}</p>
                    </div>
                </div>
                <div id="moreInfoDiv">
                    <p><span style={{ fontWeight: "bold" }}>קצת על המסלול: </span>{thisTrail.moreInfo}</p>
                    <br />
                    <p><span style={{ fontWeight: "bold" }}>דרכי הגעה: </span>{thisTrail.howToCome}</p>
                </div>
            </div>
        }

    </>
}