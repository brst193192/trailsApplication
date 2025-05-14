import { HomePage } from '../components/HomePage';
import { TrailsList } from '../fetaurs/trailsPages/TrailsList';
import { Login } from '../fetaurs/usersPages/Login';
import { Registration } from '../fetaurs/usersPages/Registration';
import { AddTrail } from '../fetaurs/trailsPages/AddTrail';
import { TrailDetails } from '../fetaurs/trailsPages/TrailDetails';
import { Routes, Route } from 'react-router';
import { MyTrails } from '../fetaurs/trailsPages/MyTrails';
import { UpdateTrailForm } from '../fetaurs/trailsPages/updateTrailForm';
import { FavoriteTrails } from "../fetaurs/trailsPages/FavoriteTrails"

export const Routing=()=>{

    return <>
        <Routes>
            <Route path="/" element={<HomePage/>}>דף הבית</Route>
            <Route path="trails" element={<TrailsList/>}>מסלולים</Route>
            <Route path="login" element={<Login/>}>התחברות</Route>
            <Route path="register" element={<Registration/>}>הרשמה</Route>
            <Route path="myfavorites" element={<FavoriteTrails/>}>המועדפים שלי</Route>
            <Route path="myTrails" element={<MyTrails/>}>הטיולים שלי</Route>
            <Route path="addTrail" element={<AddTrail/>}>הוספת מסלול</Route>
            <Route path="trailDeails/:trailId" element={<TrailDetails/>}>הרשמה</Route>
            <Route path="UpdateTrailForm/:trailId" element={<UpdateTrailForm/>}>עדכון פרטי מסלול</Route>
        </Routes>
    </>
}