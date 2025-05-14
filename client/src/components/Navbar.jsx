import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"
import { setAllCurrentfavorites, setAllCurrentTrails, setCurrentUser } from "../fetaurs/usersPages/usersListSlice";

export const Navbar=()=>{
    const currentUser=useSelector(state=>state.users.currentUser==null ? null : state.users.currentUser);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const changeLoged=()=>{
        if(currentUser){
            dispatch(setCurrentUser(null));
            dispatch(setAllCurrentTrails(null));
            dispatch(setAllCurrentfavorites(null));
        }
        else navigate("/login");
    }

    return<>
        <nav>
            <p style={{fontSize:"2.5rem"}}>🚵‍♀️</p>
            <Link className="navLink" title="מעבר לדף הבית" to="/">דף הבית</Link>
            <Link className="navLink" title="מעבר לדף המסלולים" to="trails">מסלולים</Link>
            <Link className="navLink" title="התחברות למערכת" to="login">התחברות</Link>
            <Link className="navLink" title="הצגת הטיולים המועדפים שלך" to="myfavorites">המועדפים שלי</Link>
            <Link className="navLink" title="הצגת המסלולים שאתה הוספת" to="myTrails">הטיולים שלי</Link>
            <Link className="navLink" title="הוספת מסלול משלך" to="addTrail">הוספת מסלול</Link>
            <button id="currentUserDiv" title={currentUser?"לחץ פעמיים ליציאה":"לחץ פעמיים למעבר להתחברות"} onDoubleClick={()=>changeLoged()}>
                <span style={{fontSize:"2rem"}}>👨‍💼</span>{currentUser?currentUser.firstName+" "+currentUser.lastName:"מצב אורח"} </button>
        </nav>
    </>
}