import classes from './OnderwerpLijst.module.css';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from "../ui/Card";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import { SimpleGrid } from '@chakra-ui/react'
import GroupsIcon from "@mui/icons-material/Groups";

const OnderwerpLijst = () => {
    const [onderwerpen, setOnderwerpen] = useState();
    const [favorieten_id, setFavorieten_id] = useState([]);
    const [veranderd, setVeranderd] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/onderwerpen', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setOnderwerpen(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            let array = [];
            try{
                const response = await axiosPrivate.get("/auth/favorieten");
                array = response?.data;
                console.log(array);
                setVeranderd(false)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            let idarray = [];
            array.map((onderwerp, i) =>
                idarray.push(onderwerp.id))
            setFavorieten_id(idarray);
        }

        getOnderwerpen();

        return () => {
            isMounted = false;
            controller.abort();
        }
        }, [veranderd])

    const favoriet = async (id) => {
        let array = [];
        try{
            const response = await axiosPrivate.get("/auth/favorieten");
                array = response?.data;
                console.log(array);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
        setFavorieten_id([])
        let idarray = [];
        array.map((onderwerp, i) =>
                    idarray.push(onderwerp.id))
        setFavorieten_id(idarray);
        console.log("id array" + idarray);
        let found = false;
        if (favorieten_id !== []) {
            found = favorieten_id.includes(id);
        }
        console.log(favorieten_id);
        console.log(found);
        if (found) {
            try {
                axiosPrivate.delete("/auth/deletefavoriet/" + id,
                {
                    headers: { 'Content-Type': 'application/json'}
                });
                setVeranderd(true)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }
        else{
            try {
                axiosPrivate.post("/auth/addfavoriet/" + id,
                    {
                        headers: { 'Content-Type': 'application/json'}
                    });
                setVeranderd(true)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            }
    }
    const iconButtonStyles = {
        height: "40px",
    };


    return (
        <ul>
            {onderwerpen?.length
                ? (
                    <SimpleGrid minChildWidth='250px' spacing='50px'>
                        {onderwerpen.map((onderwerp, i) =>
                            {
                                if(!onderwerp.hideObject)
                                    return(
                                        <Card key={i}>
                                            <div className={classes.content}>
                                                <h3 >{onderwerp.name}</h3>
                                                <p>Target group: {onderwerp.doelgroep}</p>
                                                <p> Promoter: {onderwerp.promotor}</p>
                                                <p> <GroupsIcon /> : {onderwerp.capacity}</p>
                                                {onderwerp.disciplines.isEmpty ? (
                                                    <p> Disciplines: {onderwerp.disciplines}</p>) : <p></p>
                                                }
                                            </div>
                                            <div className={classes.actions}>
                                                <IconButton onClick={()=>favoriet(onderwerp.id)}>{favorieten_id.includes(onderwerp.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
                                                <IconButton sx={iconButtonStyles}><Link to={window.location.pathname + `/${onderwerp.id}`}><InfoIcon/></Link></IconButton>
                                            </div>
                                        </Card>
                                    )
                            }
                        )}
                    </SimpleGrid>
                ) : <p>No subjects to show</p>
            }
        </ul>
    );
}
export default OnderwerpLijst;