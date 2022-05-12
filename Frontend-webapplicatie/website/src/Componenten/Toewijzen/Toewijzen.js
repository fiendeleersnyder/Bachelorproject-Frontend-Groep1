import {useCallback, useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import classes from './Toewijzen.module.css';
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


    useEffect(() => {
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/onderwerpen', {
                    signal: controller.signal
                });
                console.log(response.data);
                arrayOnderwerpen = response.data;
                setOnderwerpen(response.data)
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
            setStudenten([])
            /*idarray.map(async (onderwerp, i) => {
                try {
                    const response = await axiosPrivate.get('/selection/' + onderwerp, {
                        signal: controller.signal
                    });
                    const timer = setTimeout(() => {
                        console.log(response.data);
                        gebruikerarray.push(response.data);
                        console.log(gebruikerarray);
                        setStudenten(gebruikerarray)
                        console.log(student);
                    }, 10);
                    return() => clearTimeout(timer);

                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: {from: location}, replace: true})
                }
            })*/
            for(var i in idarray) {
                try {
                    const response = await axiosPrivate.get('/selection/' + idarray[i], {
                        signal: controller.signal
                    });
                        console.log(response.data);
                        gebruikerarray.push(response.data);
                        console.log(gebruikerarray);
                        setStudenten(gebruikerarray)
                        console.log(student);
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: {from: location}, replace: true})
                }
            }
        }

        getOnderwerpen();

        return () => {
            controller.abort();
        }
    }, [veranderd])


    const studentToewijzen = async (oid, sid) => {
        try {
            const response = await axiosPrivate.post('/auth/toewijzen/' + oid + "/" + sid);
            console.log(response.data);
            setVeranderd(true)
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }
    return(
        <ul>
            <h1>Subjects yet to be assigned</h1>
            {onderwerpen?.length
            ? (
                onderwerpen?.map((onderwerp, i1) =>
                    {
                        if(onderwerp.toegewezen?.length !== onderwerp.capacity && !onderwerp.hideObject)
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
                                                {student.length ?
                                                    student.map((array, i2) =>
                                                        0===i2 ?
                                                        array?.map((gebruiker, i3) =>{
                                                            if(gebruiker.toegewezen === null)
                                                            return(
                                                                    <TableRow key={i3}>
                                                                        <TableCell>{gebruiker.name}</TableCell>
                                                                        <TableCell>{gebruiker.selection?.map((onderwerp1, i3) => {
                                                                                if (onderwerp.name === onderwerp1.name)
                                                                                    return (
                                                                                        i3 + 1
                                                                                    );
                                                                            }
                                                                        )}</TableCell>
                                                                        <TableCell>{gebruiker.id === onderwerp.boosted ?
                                                                            <p>Yes</p> : <p>No</p>}</TableCell>
                                                                        <TableCell><IconButton
                                                                            onClick={() => studentToewijzen(onderwerp.id, gebruiker.id)}
                                                                            className={classes.knopje}><CheckIcon/></IconButton></TableCell>
                                                                    </TableRow>)})
                                                            :<p></p>
                                                ): <p>No students</p>}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                        if (onderwerp.toegewezen?.length === onderwerp.capacity)
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