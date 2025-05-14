import { useSelector } from "react-redux";
import { TrailCard } from "./TrailCard"

export const FavoriteTrails = () => {
    const favorites = useSelector(state => state.users.currentfavorites);
    const currentUser = useSelector(state => state.users.currentUser);

    return <>
        <div id="allCardsDiv">
        <div className="grid">
            {currentUser==null && <p>עליך להתחבר כדי לראות את רשימת המועדפים שלך!</p>}
            {currentUser!=null && favorites && favorites.length>0 && favorites.map((t,i)=><TrailCard key={"trail"+i} trail={t}></TrailCard>)}
            {currentUser!=null && favorites && favorites.length==0 && <p>עוד אין לך מועדפים, הגיע הזמן שתתחיל לאסוף...</p>}
        </div>
    </div>       
    </>
}