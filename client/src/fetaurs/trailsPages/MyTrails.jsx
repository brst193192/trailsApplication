import { useSelector } from "react-redux";
import { TrailCard } from "./TrailCard";

export const MyTrails=()=>{
    const myTrails=useSelector(state=>state.users.currentsTrails);
    const currentUser=useSelector(state=>state.users.currentUser);

    return<>
    <div id="allCardsDiv">
        <div className="grid">
            {currentUser==null && <p>עליך להתחבר כדי לראות את רשימת הטיולים שלך!</p>}
            {currentUser!=null && myTrails && myTrails.length>0 &&
                myTrails.map((t,i)=><TrailCard key={"trail"+i} trail={t}></TrailCard>)}
            {currentUser!=null && myTrails && myTrails.length==0 &&
                <p>עוד אין לך טיולים, הגיע הזמן שתתחיל לאסוף...</p>}
        </div>
    </div>       
    </>
}