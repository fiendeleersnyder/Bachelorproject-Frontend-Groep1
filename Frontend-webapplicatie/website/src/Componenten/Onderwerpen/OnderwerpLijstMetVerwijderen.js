import classes from './OnderwerpLijst.module.css';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Card from "../ui/Card";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from "@mui/icons-material/Info";
import { SimpleGrid } from '@chakra-ui/react'
import GroupsIcon from '@mui/icons-material/Groups';

const OnderwerpLijstMetVerwijderen = () => {
    const [onderwerpen, setOnderwerpen] = useState();
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
                isMounted && setOnderwerpen(response.data)
                setVeranderd(false)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getOnderwerpen();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [veranderd])


    const voegToe = async (id) => {
        try {
            const response = axiosPrivate.post("/voegToe/" + id,
                {
                    headers: { 'Content-Type': 'application/json'}
                });
            setVeranderd(true)
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    const verwijder = async (id) => {
        try {
            axiosPrivate.delete("/verwijder/" + id,
                {
                    headers: { 'Content-Type' : 'application/json'}
                });
            setVeranderd(true)
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    const iconButtonStyles = {
        height: "39px",
    };

    return (
        <ul>
            <h1>Approved subjects</h1>
            {onderwerpen?.length
                ? (
                    <SimpleGrid minChildWidth='250px' spacing='50px'>
                        {onderwerpen.map((onderwerp, i) =>
                        {
                            if(!onderwerp.hideObject)
                            return(
                                    <Card key={i}>
                                        <IconButton onClick={()=>verwijder(onderwerp.id)} className={classes.knopje}><DeleteIcon></DeleteIcon></IconButton>
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
                                            <IconButton sx={iconButtonStyles}><Link to={window.location.pathname + `/${onderwerp.id}`}><InfoIcon/></Link></IconButton>
                                        </div>
                                    </Card>
                            )
                        }
                        )}
                    </SimpleGrid>
                ) : <p>No approved subjects</p>
            }
            <h1>Subjects under reservation/refused</h1>
            {onderwerpen?.length
                ? (
                    <SimpleGrid minChildWidth='250px' spacing='50px'>
                        {onderwerpen.map((onderwerp, i) =>
                            {
                                if (onderwerp.hideObject)
                                return(
                                    <Card key={i}>
                                        <IconButton onClick={() => voegToe(onderwerp.id)} className={classes.knopje}><CheckIcon /></IconButton>
                                        <div className={classes.content}>
                                            <h3>{onderwerp.name}</h3>
                                            <p>Target group: {onderwerp.doelgroep}</p>
                                            <p> Promoter: {onderwerp.promotor}</p>
                                            <p> <GroupsIcon/> : {onderwerp.capacity}</p>
                                            {onderwerp.disciplines.isEmpty ? (
                                                <p> Disciplines: {onderwerp.disciplines}</p>) : <p></p>
                                            }
                                        </div>
                                        <div className={classes.actions}>
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
export default OnderwerpLijstMetVerwijderen;