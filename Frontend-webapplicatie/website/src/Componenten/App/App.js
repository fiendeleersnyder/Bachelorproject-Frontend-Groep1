import './App.css';
import StartPage from '../../Pages/startpage'
import Account from '../../Pages/account';
import AddOnderwerp from '../../Pages/addonderwerp';
import Chat from '../../Pages/chat';
import HomePagina from '../../Pages/home';
import Indienen from '../../Pages/indienen';
import OnderwerpenLijst from '../../Pages/onderwerpen';
import OnderwerpenLijstMetVerwijderen from '../../Pages/onderwerpenmetverwijderen'
import OnderwerpDetail from '../../Pages/onderwerpdetail'
import UserLijst from '../../Pages/users'
import Phases from '../../Pages/phases'
import None from '../../Pages/faseNone'
import Toewijzen from '../../Pages/toewijzen'
import Login from '../Login/Login';
import Missing from '../Missing/Missing'
import RequireAuth from '../Authorization/RequireAuth'
import UnAuthorized from '../Authorization/Unauthorized'
import PersistLogin from '../Login/PersistLogin'
import {Routes, Route} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../API/axios'
import React, {useEffect, useState} from 'react';
import LayoutStudent from '../Layout/LayoutStudent';
import LayoutAdmin from '../Layout/LayoutAdmin';
import LayoutCoordinator from '../Layout/LayoutCoodinator'
import LayoutBedrijf from '../Layout/LayoutBedrijf'


function App() {
    const [phase, setPhase] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const ROLES = {
        1: 'Admin',
        2: 'Student',
        3: 'Coordinator',
        4: 'Bedrijf'
    }

    useEffect(() => {
        const getPhase = async () => {
            try {
                const response = await axios.get("/phase/getcurrent");
                console.log(response.data);
                setPhase(response.data)
            } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
        }
        getPhase();
    }, [])
    return (
        phase==="None" ?
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/unauthorized" element={<UnAuthorized/>}/>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/" element={<LayoutAdmin/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                        <Route path='/admin/' element={<HomePagina/>}/>
                        <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                        <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/admin/indienen' element={<Indienen/>}/>
                        <Route path='/admin/users' element={<UserLijst/>}/>
                        <Route path='/admin/phases' element={<Phases />} />
                        <Route path='/admin/account' element={<Account/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutStudent/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                        <Route path='/student/' element={<HomePagina/>}/>
                        <Route path='/student/onderwerpen' element={<OnderwerpenLijst/>}/>
                        <Route path='/student/onderwerpen/:id' element = {<OnderwerpDetail />}/>
                        <Route path='/student/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/student/indienen' element={<Indienen/>}/>
                        <Route path='/student/chat' element={<Chat/>}/>
                        <Route path='/student/account' element={<Account/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutCoordinator/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                        <Route path='/coordinator/' element={<HomePagina/>}/>
                        <Route path='/coordinator/onderwerpen' element={<OnderwerpenLijstMetVerwijderen />}/>
                        <Route path='/coordinator/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/coordinator/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/coordinator/toewijzen' element={<Toewijzen />}/>
                        <Route path='/coordinator/chat' element={<Chat/>}/>
                        <Route path='/coordinator/account' element={<Account/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutBedrijf/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                        <Route path='/bedrijf/' element={<HomePagina/>}/>
                        <Route path='/bedrijf/onderwerpen' element={<OnderwerpenLijst />}/>
                        <Route path='/bedrijf/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/bedrijf/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/bedrijf/chat' element={<Chat/>}/>
                        <Route path='/bedrijf/account' element={<Account/>}/>
                    </Route>
                </Route>
            </Route>
            {/*<Route path='*' element={<None />}/>*/}
            {/* catch all */}
            <Route path="*" element={<Missing/>}/>
        </Routes>
            : <Routes><Route path='/*' element={<None />}/></Routes>
    );
}

export default App;
