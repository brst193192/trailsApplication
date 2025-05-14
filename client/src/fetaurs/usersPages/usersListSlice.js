import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    currentfavorites:null,
    currentsTrails:null,
}

const usersListSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser : (state, action) => {
            state.currentUser=action.payload;
        },
        setAllCurrentfavorites : (state, action) => {
            state.currentfavorites=action.payload;
            console.log("currentfavorites",state.currentfavorites);
        },
        changefavoriteStatus : (state, action) => {
            const trail=action.payload.trail;
            const isfavorite=action.payload.isfavorite;
            const favorites=state.currentUser.favoriteTrails;
            if(isfavorite===false)
                state.currentfavorites.push(trail);
            else
                state.currentfavorites=state.currentfavorites.filter(ft=>ft.id!==trail.id);
            console.log("favorites:",favorites);
        },
        setAllCurrentTrails : (state, action) => {
            state.currentsTrails=action.payload;
            console.log("currentsTrails",state.currentsTrails);
        },
        addCurrentTrail : (state, action) => {
            console.log("currentsTrails",state.currentsTrails);
            if(state.currentsTrails==null)
                state.currentsTrails=[action.payload];
            else state.currentsTrails.push(action.payload);
        },
        updateAllListsOfTrailsInStore : (state, action) => {
            const updTrail=action.payload;
            console.log("favorites",state.currentfavorites);
            console.log("current trails",state.currentsTrails);
            let i=state.currentfavorites.findIndex(i=>i.id===updTrail.id);
            // ??? ??? ??? 
            // כאן הוא נתקע כי האובייקט מוצג לו בצורה מוזרה
            if(i!==-1)
                state.currentfavorites[i]=updTrail;
            i=state.currentsTrails.findIndex(i=>i.id===updTrail.id);
            if(i!==-1)
                state.currentsTrails[i]=updTrail;
        },
        deleteTrailFromAllListsInStore : (state, action) => {
            const trailId=action.payload;
            //מחיקת הטיול מרשימת המועדפים של המשתמש הנוכחי
            if(state.currentfavorites)
                state.currentfavorites=state.currentfavorites.filter(t=>t.id!==trailId);
            //מחיקת הטיול מרשימת הטיולים של המשתמש הנוכחי
            if(state.currentsTrails)
                state.currentsTrails=state.currentsTrails.filter(t=>t.id!==trailId);
        }
    }
})

export const { setCurrentUser, setAllCurrentfavorites, changefavoriteStatus, setAllCurrentTrails, 
    addCurrentTrail, updateAllListsOfTrailsInStore, deleteTrailFromAllListsInStore} = usersListSlice.actions;
export default usersListSlice.reducer;