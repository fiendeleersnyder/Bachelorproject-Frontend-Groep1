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
import Login from '../Login/Login';
import Missing from '../Missing/Missing'
import RequireAuth from '../Authorization/RequireAuth'
import UnAuthorized from '../Authorization/Unauthorized'
import PersistLogin from '../Login/PersistLogin'
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import LayoutStudent from '../Layout/LayoutStudent';
import LayoutAdmin from '../Layout/LayoutAdmin';
import LayoutCoordinator from '../Layout/LayoutCoodinator'
import LayoutBedrijf from '../Layout/LayoutBedrijf'


function App() {

    const ROLES = {
        1: 'Admin',
        2: 'Student',
        3: 'Coordinator',
        4: 'Bedrijf'
    }

    var thedate   = new Date();
    //console.log(thedate);
    var hourofday = thedate.getUTCHours();
    //console.log(hourofday);
    var minuteofday = thedate.getMinutes()
    //console.log(minuteofday);
    var day = thedate.getDate();
    //console.log(day);
    var maand = thedate.getMonth();
    //console.log(maand);

    return (
        (hourofday >= 0 && minuteofday >= 0 && day > 0 && maand+1 > 3)
        ?(
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
                {/* catch all */}
                <Route path="*" element={<Missing/>}/>
            </Routes>
            ): <p>Nothing to show</p>
    );
}

export default App;
