import './App.css';
import Account from '../../Pages/account';
import AddOnderwerp from '../../Pages/addonderwerp';
import Chat from '../../Pages/chat';
import HomePagina from '../../Pages/home';
import Indienen from '../../Pages/indienen';
import OnderwerpenLijst from '../../Pages/onderwerpen';
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Missing from '../Missing/Missing'
import RequireAuth from '../Authorization/RequireAuth'
import UnAuthorized from '../Authorization/Unauthorized'
import {Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import LayoutStudent from '../Layout/LayoutStudent';
import LayoutAdmin from '../Layout/LayoutAdmin';


function App() {

    const ROLES = {
        'Admin': 1,
        'Student': 2
    }

    /*function requireAuth(nextState, replaceState) {
        if (!auth.loggedIn())
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }*/

    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="/" element={<LayoutAdmin />}>
                    {/* protected routes */}
                    <Route path="/" element={<RequireAuth />} >
                        <Route path='/' element={<HomePagina/>}/>
                        <Route path='/onderwerpen' element={<OnderwerpenLijst/>}/>
                        <Route path='/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/indienen' element={<Indienen/>}/>
                        <Route path='/account' element={<Account/>}/>
                    </Route>
                </Route>
                <Route path="/" element={<LayoutStudent />}>
                    {/* protected routes */}
                    <Route path="/" element={<RequireAuth />} >
                        <Route path='/' element={<HomePagina/>}/>
                        <Route path='/onderwerpen' element={<OnderwerpenLijst/>}/>
                        <Route path='/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/indienen' element={<Indienen/>}/>
                        <Route path='/chat' element={<Chat/>}/>
                        <Route path='/account' element={<Account/>}/>
                    </Route>
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
    );
}

export default App;
