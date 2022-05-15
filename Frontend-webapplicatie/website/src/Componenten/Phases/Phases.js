import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import classes from './Phases.module.css';
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Phases = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedStartDateP1, setSelectedStartDateP1] = useState();
    const [selectedEndDateP1, setSelectedEndDateP1] = useState();
    const [selectedEndDateP2, setSelectedEndDateP2] = useState();
    const [selectedEndDateP3, setSelectedEndDateP3] = useState();
    const [selectedEndDateP4, setSelectedEndDateP4] = useState();
    const [currentPhases, setcurrentPhases] = useState([]);
    const [veranderd, setVeranderd] = useState();


    useEffect(() => {
        const controller = new AbortController();

        const getPhases = async () => {
            try {
                const response = await axiosPrivate.get('/phase/getobject');
                console.log(response.data);
                setVeranderd(false)
                var array = [];
                var p1 = response.data.startP1;
                var p2 = response.data.endP1;
                var p3 = response.data.endP2;
                var p4 = response.data.endP3;
                var p5 = response.data.endP4;
                console.log(p1);
                var datep1 = toISO(p1)
                array.push(datep1);
                var datep2 = toISO(p2)
                array.push(datep2);
                var datep3 = toISO(p3)
                array.push(datep3);
                var datep4 = toISO(p4)
                array.push(datep4);
                var datep5 = toISO(p5)
                array.push(datep5);
                const onderwerpData = {
                    startP1: datep1,
                    endP1: datep2,
                    endP2: datep3,
                    endP3: datep4,
                    endP4: datep5
                };
                setcurrentPhases(array)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        const toISO = (date) => {
            var newdate = new Date(date);
            var year = newdate.getFullYear();
            var month = newdate.getMonth() + 1;
            var dt = newdate.getDate()
            var hour = newdate.getHours();
            var minutes = newdate.getMinutes()
            var time;

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (hour > 11) {
                hour -= 12;
                time = 'PM';
            }
            else {
                time = 'AM';
            }

            var correct_date = dt + '/' + month + '/' + year + ' ' + hour + ":" + minutes + " " + time;
            return correct_date;
        }

        getPhases();

        return () => {
            controller.abort();
        }
    }, [veranderd])

    const verzendfases = async () => {
        var offset = (new Date()).getTimezoneOffset() * 60000
        var startP1 = (new Date(selectedStartDateP1-offset)).toISOString().split("Z")[0];
        var endP1 = (new Date(selectedEndDateP1-offset)).toISOString().split("Z")[0];
        var endP2 = (new Date(selectedEndDateP2-offset)).toISOString().split("Z")[0];
        var endP3 = (new Date(selectedEndDateP3-offset)).toISOString().split("Z")[0];
        var endP4 = (new Date(selectedEndDateP4-offset)).toISOString().split("Z")[0];

        const onderwerpData = {
            id:1,
            startP1: startP1,
            endP1: endP1,
            endP2: endP2,
            endP3: endP3,
            endP4: endP4
        };
        console.log(onderwerpData);

        try {
            await axiosPrivate.post("/phase/setcurrent",
                JSON.stringify(onderwerpData),
                {
                    headers: { 'Content-Type': 'application/json'}
                })
            setVeranderd(true)
            setSelectedStartDateP1(null)
            setSelectedEndDateP1(null)
            setSelectedEndDateP2(null)
            setSelectedEndDateP3(null)
            setSelectedEndDateP4(null)
        }catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    const veranderStartP1 = (date) => {
        setSelectedStartDateP1(date)
        setSelectedEndDateP1(date)
        setSelectedEndDateP2(date)
        setSelectedEndDateP3(date)
        setSelectedEndDateP4(date)
    }

    const veranderEndP1 = (date) => {
        setSelectedEndDateP1(date)
        setSelectedEndDateP2(date)
        setSelectedEndDateP3(date)
        setSelectedEndDateP4(date)
    }
    const veranderEndP2 = (date) => {
        setSelectedEndDateP2(date)
        setSelectedEndDateP3(date)
        setSelectedEndDateP4(date)
    }
    const veranderEndP3 = (date) => {
        setSelectedEndDateP3(date)
        setSelectedEndDateP4(date)
    }
    const veranderEndP4 = (date) => {
        setSelectedEndDateP4(date)

    }

    const getdatum = () => {
        console.log(`start date P1: ${selectedStartDateP1}`)
    }

    return(
        <div className={classes.container}>
            <div className={classes.element}>
            <h2>Update phases</h2>
                <h3>Decide start date for every phase</h3>
            <h4>Subjects phase: <DatePicker
                selected={selectedStartDateP1}
                onChange={date => veranderStartP1(date)}
                dateFormat='dd/MM/yyyy hh:mm aa'
                showYearDropdown
                scrolllableMonthYearDropdown
                showTimeSelect
                timeIntervals={5}
            /></h4>
            <h4>Choice phase : <DatePicker
                selected={selectedEndDateP1}
                onChange={date => veranderEndP1(date)}
                dateFormat='dd/MM/yyyy hh:mm aa'
                minDate={selectedStartDateP1}
                showYearDropdown
                scrolllableMonthYearDropdown
                showTimeSelect
                timeIntervals={5}
            /></h4>
            <h4>Boost phase: <DatePicker
                selected={selectedEndDateP2}
                onChange={date => veranderEndP2(date)}
                dateFormat='dd/MM/yyyy hh:mm aa'
                minDate={selectedEndDateP1}
                showYearDropdown
                scrolllableMonthYearDropdown
                showTimeSelect
                timeIntervals={5}
            /></h4>
                <h4>Assign phase: <DatePicker
                    selected={selectedEndDateP3}
                    onChange={date => veranderEndP3(date)}
                    dateFormat='dd/MM/yyyy hh:mm aa'
                    minDate={selectedEndDateP2}
                    showYearDropdown
                    scrolllableMonthYearDropdown
                    showTimeSelect
                    timeIntervals={5}
                /></h4>
                <h4>Rest phase: <DatePicker
                    selected={selectedEndDateP4}
                    onChange={date => veranderEndP4(date)}
                    dateFormat='dd/MM/yyyy hh:mm aa'
                    minDate={selectedEndDateP3}
                    showYearDropdown
                    scrolllableMonthYearDropdown
                    showTimeSelect
                    timeIntervals={5}
                /></h4>
            <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" onClick={verzendfases}>Submit</button>
            </div>
            <div className={classes.element}>
                <h2>Current phases</h2>
                {currentPhases.map((date, i) => {
                    if(i===0)
                        return(
                            <h4 key={i}>Subjects phase:
                                <p>{date}</p>
                            </h4>
                        )
                    else if(i===1)
                        return (
                            <h4 key={i}>Choice phase:
                                <p>{date}</p>
                            </h4>
                        )
                    else if(i===2)
                        return (
                            <h4 key={i}>Boost phase:
                                <p>{date}</p>
                            </h4>
                        )
                    else if (i===3)
                        return (
                            <h4 key={i}>Assign phase:
                                <p>{date}</p>
                            </h4>
                        )
                    else if (i===4)
                        return (
                            <h4 key={i}>Rest phase:
                                <p>{date}</p>
                            </h4>
                        )
                })}
            </div>
        </div>
    )
};

export default Phases;