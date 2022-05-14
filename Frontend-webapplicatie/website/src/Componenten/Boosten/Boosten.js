import {useCallback, useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import classes from '../Toewijzen/Toewijzen.module.css';
import Card from "../ui/Card";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import GroupsIcon from '@mui/icons-material/Groups';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

const Toewijzen = () => {
    const [onderwerpen, setOnderwerpen] = useState([]);
    const [student, setStudenten] = useState([]);
    const [veranderd, setVeranderd] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    var arrayOnderwerpen;
    var idarray = [];
    var gebruikerarray = [];
    var teller = 0;
    var lijst=[];
    var check_onderwerp = 0;
    var arrayStudenten = [];


    useEffect(() => {
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/promotoronderwerpen', {
                    signal: controller.signal
                });
                console.log(response.data);
                arrayOnderwerpen = response.data;
                setOnderwerpen(response.data)
                setVeranderd(false)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getOnderwerpen();

        return () => {
            controller.abort();
        }
    }, [veranderd])


    const studentBoosten = async (oid, sid) => {
        try {
            const response = await axiosPrivate.post('/auth/boost/' + oid + "/" + sid);
            console.log(response.data);
            setVeranderd(true)
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    const studentOntboosten = async (oid, sid) => {
        try {
            const response = await axiosPrivate.post('/auth/ontboost/' + oid + "/" + sid);
            console.log(response.data);
            setVeranderd(true)
        } catch (err) {
            console.error(err);
            //navigate('/login', { state: {from: location}, replace: true})
        }
    }

    return(
        <ul>
            <h1>Your subjects</h1>
            {onderwerpen?.length
                ? (
                    onderwerpen?.map((onderwerp, i) =>
                    {if(onderwerp.toegewezen?.length !== onderwerp.capacity && !onderwerp.hideObject)
                        return(
                            <div className={classes.container} key={i}>
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
                                            {onderwerp.selection.length ?
                                                onderwerp.selection?.map((gebruiker, j) =>
                                                    <TableRow key={j}>
                                                        <TableCell>{gebruiker.firstname + " " + gebruiker.name}</TableCell>
                                                        <TableCell>{gebruiker.selection?.map((onderwerpid, j) => {
                                                               if (onderwerpid === onderwerp.id)
                                                                   return (
                                                                       j + 1
                                                                   );
                                                           }
                                                           )}</TableCell>
                                                        <TableCell>{gebruiker.id === onderwerp.boosted ?
                                                            <p>Yes</p> : <p>No</p>}</TableCell>
                                                        <TableCell>{onderwerp.boosted === null ?
                                                            <IconButton
                                                                onClick={() => studentBoosten(onderwerp.id, gebruiker.id)}
                                                                className={classes.knopje}><CheckIcon/></IconButton>
                                                            :gebruiker.id === onderwerp.boosted ?
                                                                <IconButton
                                                                    onClick={() => studentOntboosten(onderwerp.id, gebruiker.id)}
                                                                    className={classes.knopje}><CloseIcon/></IconButton>
                                                                :null
                                                        }</TableCell>
                                                    </TableRow>
                                                ):<p>No students</p>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                        )
                    })
                ) : <p>No subjects to assign</p>
            }
        </ul>
    )
}
export default Toewijzen;