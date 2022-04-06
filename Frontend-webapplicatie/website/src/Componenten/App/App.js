import './App.css';
import StartPage from '../../Pages/startpage'
import Account from '../../Pages/account';
import AddOnderwerp from '../../Pages/addonderwerp';
import Chat from '../../Pages/chat';
import HomePagina from '../../Pages/home';
import Indienen from '../../Pages/indienen';
import OnderwerpenLijst from '../../Pages/onderwerpen';
import Login from '../Login/Login';
import Missing from '../Missing/Missing'
import RequireAuth from '../Authorization/RequireAuth'
import UnAuthorized from '../Authorization/Unauthorized'
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import LayoutStudent from '../Layout/LayoutStudent';
import LayoutAdmin from '../Layout/LayoutAdmin';


function App() {

    const ROLES = {
        1: 'Admin',
        2: 'Student'
    }

    /*function requireAuth(nextState, replaceState) {
        if (!auth.loggedIn())
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }*/

    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="/" element={<StartPage />} />
                <Route path="/" element={<LayoutAdmin />}>
                    {/* protected routes */}
                    <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>} >
                        <Route path='/admin/' element={<HomePagina/>}/>
                        <Route path='/admin/onderwerpen' element={<OnderwerpenLijst/>}/>
                        <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/admin/indienen' element={<Indienen/>}/>
                        <Route path='/admin/account' element={<Account/>}/>
                    </Route>
                </Route>
                <Route path="/" element={<LayoutStudent />}>
                    {/* protected routes */}
                    <Route path="/" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>} >
                        <Route path='/student/' element={<HomePagina/>}/>
                        <Route path='/student/onderwerpen' element={<OnderwerpenLijst/>}/>
                        <Route path='/student/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/student/indienen' element={<Indienen/>}/>
                        <Route path='/student/chat' element={<Chat/>}/>
                        <Route path='/student/account' element={<Account/>}/>
                    </Route>
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
    );
}

export default App;
