import {useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import classes from './Toewijzen.module.css';
import Card from "../ui/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Toewijzen = () => {
    const [onderwerpen, setOnderwerpen] = useState([]);
    const [gebruikers, setGebruikers] = useState([]);
    const [veranderd, setVeranderd] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    var arrayOnderwerpen;
    var idarray = [];
    var gebruikerarray = [];
    var gebruikerarray2;

    useEffect(() => {
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/onderwerpen', {
                    signal: controller.signal
                });
                console.log(response.data);
                arrayOnderwerpen = response.data;
                setOnderwerpen(arrayOnderwerpen)
                arrayOnderwerpen?.map((onderwerp, i) => {
                    if (!onderwerp.hideObject)
                        return(
                            idarray.push(onderwerp.id)
                        )
                })
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            idarray.map(async (id, i) => {
                try {
                    const response = await axiosPrivate.get('/selection/' + id, {
                        signal: controller.signal
                    });
                    console.log(response.data);
                    gebruikerarray.push(response.data);
                    gebruikerarray2 = gebruikerarray;
                    console.log(gebruikerarray);
                    setGebruikers(gebruikerarray2)
                    console.log(gebruikers);
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: {from: location}, replace: true})
                }
            })
        }

        getOnderwerpen();

        return () => {
            controller.abort();
        }
    }, [veranderd])

    const checkGebruikers = () => {
        console.log(gebruikers);
    }

    const checkArray = (array) => {
        console.log(array);
    }
    return(
        <ul>
            <h1>Subjects yet to be assigned</h1>
            {onderwerpen?.length
            ? (
                onderwerpen?.map((onderwerp, i1) =>
                    {
                        if(!onderwerp.toegewezen.isEmpty && !onderwerp.hideObject)
                            return(
                                <div className={classes.container} key={i1}>
                                    <Card>
                                        <div className={classes.content}>
                                            <h3>{onderwerp.name}</h3>
                                            <p>Target group: {onderwerp.doelgroep}</p>
                                            <p> Promoter: {onderwerp.promotor}</p>
                                            <p> <GroupsIcon /> : {onderwerp.capacity}</p>
                                        </div>
                                    </Card>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Student</TableCell>
                                                    <TableCell>Place</TableCell>
                                                    <TableCell>Boosted</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {gebruikers?.map((array, i2) => {
                                                    array?.map((gebruiker, i3) => {
                                                        <TableRow>
                                                            <TableCell>{gebruiker.name}</TableCell>
                                                            <TableCell>{gebruiker.selection?.map((onderwerp1, i3) => {
                                                                    if (onderwerp.name === onderwerp1.name)
                                                                        return(
                                                                            i3
                                                                        )
                                                                }
                                                            )}</TableCell>
                                                            <TableCell>{gebruiker.id === onderwerp.boosted ?
                                                                <p>Yes</p> : <p>No</p>}</TableCell>
                                                            <TableCell><IconButton className={classes.knopje}><CheckIcon /></IconButton></TableCell>
                                                        </TableRow>
                                                    })
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <button onClick={checkGebruikers}>checkGebruikers</button>
                                </div>

                            )
                    })
            ) : <p>No subjects to assign</p>
}
    <h1>Assigned subjects</h1>
    {onderwerpen?.length
        ? (
                onderwerpen.map((onderwerp, i) =>
                    {
                        if (onderwerp.toegewezen.isEmpty)
                            return(
                                <Card key={i}>
                                    <div className={classes.content}>
                                        <h3>{onderwerp.name}</h3>
                                        <p>Target group: {onderwerp.doelgroep}</p>
                                        <p> Promoter: {onderwerp.promotor}</p>
                                        <p> <GroupsIcon /> : {onderwerp.capacity}</p>
                                        {onderwerp.disciplines.isEmpty ? (
                                            <p> Disciplines: {onderwerp.disciplines}</p>) : <p></p>
                                        }
                                    </div>
                                </Card>
                            )
                    }
                )
        ) : <p>No subjects yet assigned</p>
    }
        </ul>
    )
}
export default Toewijzen;