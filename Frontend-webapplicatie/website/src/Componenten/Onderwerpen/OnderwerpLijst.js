import classes from './OnderwerpLijst.module.css';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth"
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from "../ui/Card";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';

const OnderwerpLijst = () => {
    const [onderwerpen, setOnderwerpen] = useState();
    const [onderwerp, setOnderwerp] = useState();
    const [favorieten_id, setFavorieten_id] = useState([]);
    const [veranderd, setVeranderd] = useState();
    const { auth } = useAuth();
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
        console.log(`favorieten:  ${favorieten_id}`)
        let idarray = [];
        array.map((onderwerp, i) =>
                    idarray.push(onderwerp.id))
        setFavorieten_id(idarray);
        console.log("id array" + idarray);
        let found = false;
        if (idarray !== []) {
            found = idarray.includes(id);
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
        height: "39px",
    };


    return (
        <ul>
            {onderwerpen?.length
                ? (
                    <ul>
                        {onderwerpen.map((onderwerp, i) =>
                            {
                                if(!onderwerp.hideObject)
                                    return(
                                        <Card key={i}>
                                            <div className={classes.content}>
                                                <h3 >{onderwerp.name}</h3>
                                                {/*<address>{props.address}</address>
                                                 <p>{props.description}</p>*/}
                                            </div>
                                            <div className={classes.actions}>
                                                <IconButton onClick={()=>favoriet(onderwerp.id)}>{favorieten_id.includes(onderwerp.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
                                                <IconButton sx={iconButtonStyles}><Link to={window.location.pathname + `/${onderwerp.id}`}><InfoIcon/></Link></IconButton>
                                            </div>
                                        </Card>
                                    )
                            }
                        )}
                    </ul>
                ) : <p>No subjects to show</p>
            }
        </ul>
    );
}
export default OnderwerpLijst;