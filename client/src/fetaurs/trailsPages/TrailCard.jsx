import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changefavoriteStatus, deleteTrailFromAllListsInStore } from "../usersPages/usersListSlice";
import { deleteTrailInServer } from "../../api/trailsApi";
import { deleteTrailFromTrilsListInStore } from "./trailsSlice";
//mui imports
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Button } from "@mui/material";
import { changefavoriteStatusInServer } from "../../api/favoritesApi";



export const TrailCard = ({ trail }) => {
    const currentUser = useSelector(state => state.users.currentUser);
    const favorites=useSelector(state=>state.users.currentfavorites);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // כדי לבדוק אם הטיול הנוכחי הוא מועדף
    const [isfavorite, setIsfavorite] = useState(false);
    useEffect(() => {
        if (favorites)
            favorites.forEach(t => {
                if (t.id == trail.id){
                    setIsfavorite(true);
                }
            });
    }, [favorites]);

    const onfavoriteChange = async () => {
        const success = await changefavoriteStatusInServer(currentUser.id, trail.id);
        if (success) {
            setIsfavorite(!isfavorite);
            dispatch(changefavoriteStatus({ trail: trail, isfavorite: isfavorite }));
        }
    }
    const deleteTrail = async () => {
        const success = await deleteTrailInServer(trail.id);
        if (success) {
            dispatch(deleteTrailFromAllListsInStore(trail.id));
            dispatch(deleteTrailFromTrilsListInStore(trail.id));
        }
    }
    const updateTrail = () => {
        navigate("/updateTrailForm/" + trail.id);
    }

    return <>
        <Card style={{color:"#747474"}}>
            <CardMedia
                component="img"
                height="350"
                image={trail.src}
                alt="כאן צריכה להיות תמונה של המקום"
            />
            <CardHeader
                title={trail.name}
                subheader={trail.description}
            />
            <Button style={{marginRight:"80%", marginBottom:"1rem"}} onClick={() => navigate("/trailDeails/" + trail.id)}>מידע נוסף ←</Button>
            {currentUser && <CardActions disableSpacing style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {isfavorite
                    ?
                    <IconButton aria-label="add to favorites" onClick={() => onfavoriteChange()}>
                        <FavoriteIcon style={{color:"#f02e50"}}/>
                    </IconButton>
                    :
                    <IconButton aria-label="remove from favorites" onClick={() => onfavoriteChange()}>
                        <FavoriteBorderIcon style={{color:"#f02e50"}}/>
                    </IconButton>
                }
                <CardActions>
                    <IconButton aria-label="delete" onClick={() => deleteTrail()}>
                        <DeleteIcon style={{color:"blue"}}/>
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => updateTrail()}>
                        <UpdateIcon style={{color:"green"}}/>
                    </IconButton>
                </CardActions>
            </CardActions>}
        </Card>
    </>
}