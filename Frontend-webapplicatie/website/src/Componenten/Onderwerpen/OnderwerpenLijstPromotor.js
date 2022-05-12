import classes from './OnderwerpLijst.module.css';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from "../ui/Card";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import { SimpleGrid } from '@chakra-ui/react'
import GroupsIcon from "@mui/icons-material/Groups";

const OnderwerpLijstPromotor = () => {
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
                isMounted && setOnderwerpen(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true})
            }
            let array = [];
        }

        getOnderwerpen();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [veranderd])

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
export default OnderwerpLijstPromotor;