import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"
import { setAllCurrentfavorites, setAllCurrentTrails, setCurrentUser } from "../fetaurs/usersPages/usersListSlice";

export const Footer=()=>{
    const amountOfTrails=useSelector(state=>state.trails.trails==null ? 0 : state.trails.trails.length);

    return<>
    <footer>
        <p>אתר זה נוצר בשנת 2025 ע"י ברכה שטרן</p>
        <p>מספר הטיולים כרגע באתר הוא {amountOfTrails}</p>
    </footer>
    </>
}