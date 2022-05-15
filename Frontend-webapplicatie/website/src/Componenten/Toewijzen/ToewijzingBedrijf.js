import {useCallback, useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import classes from './Toewijzen.module.css';
import Card from "../ui/Card";
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
    var check_onderwerp = 0;
    var arrayStudenten = [];


    useEffect(() => {
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/auth/bedrijftoegewezen', {
                    signal: controller.signal
                });
                console.log(response.data);
                arrayOnderwerpen = response.data;
                setOnderwerpen(response.data)
            } catch (err) {
                console.error(err);
                //navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getOnderwerpen();

        return () => {
            controller.abort();
        }
    }, [veranderd])


    return(
        <ul>
            <h1>My subjects</h1>
            {onderwerpen?.length
                ? (
                    onderwerpen?.map((onderwerp, i) =>
                    {if(!onderwerp.hideObject)
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {onderwerp.selection.length ?
                                                onderwerp.selection?.map((gebruiker, j) =>
                                                    <TableRow key={j}>
                                                        <TableCell>{gebruiker.firstname + " " + gebruiker.name}</TableCell>
                                                    </TableRow>
                                                ):<p>No students</p>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                        )
                    })
                ) : <p>No subjects</p>
            }
        </ul>
    )
}
export default Toewijzen;