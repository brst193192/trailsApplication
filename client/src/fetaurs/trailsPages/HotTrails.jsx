import { useDispatch, useSelector } from "react-redux";
import { TrailCard } from "./TrailCard"
import { useEffect } from "react";
import { setHotTrails } from "./trailsSlice";
import { getHotTrailsFromServer } from "../../api/favoritesApi";

export const HotTrails = () => {
    const hot = useSelector(state => state.trails.hotTrails);
    const favorites = useSelector(state => state.users.currentfavorites);
    const dispatch = useDispatch();

    const getTrailsFromServerAsync = async () => {
        const hots = await getHotTrailsFromServer();
        dispatch(setHotTrails(hots));
        console.log("hotTrails: ", hots);

    }
    //שליפת הטיולים החמים מהשרת ועדכון בסטור
    useEffect(() => {
            getTrailsFromServerAsync();
    }, [favorites]);

    return <>
        <div id="allCardsDiv">
            <div className="grid">
                {hot && hot.map((t, i) => <TrailCard key={"trail" + i} trail={t}></TrailCard>)}
                <br/>
            </div>
        </div>
    </>
}