import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trails:null,
    hotTrails:null,
}

const trailsSlice = createSlice({
    name: "trails",
    initialState,
    reducers: {
        setAllTrails: (state, action) => {
            state.trails=action.payload;
        },
        addNewTrail : (state, action) => {
            const newTrail=action.payload;
            state.trails=[...state.trails,newTrail];
        },
        updateTrailInStore : (state, action) => {
            const updTrail=action.payload;
            const i=state.trails.findIndex(t=>t.id==updTrail.id);
            state.trails[i]=updTrail;
        },
        deleteTrailFromTrilsListInStore : (state, action) => {
            const id=action.payload;
            console.log("before deleted",state.trails);
            state.trails=state.trails.filter(t=>t.id!=id);
            console.log("after deleted",state.trails);
        },
        setHotTrails : (state, action) => {
            state.hotTrails=action.payload;
        }
    }

})

export const { setAllTrails, addNewTrail, updateTrailInStore, deleteTrailFromTrilsListInStore, setHotTrails} = trailsSlice.actions;
export default trailsSlice.reducer;