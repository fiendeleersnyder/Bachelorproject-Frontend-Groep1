import './App.css';
import StartPage from '../../Pages/startpage'
import Accountadmin from '../../Pages/accountpages/accountadmin';
import AccountStudent from '../../Pages/accountpages/accountstudent';
import AccountBedrijf from '../../Pages/accountpages/accountbedrijf';
import AccountCoordinator from '../../Pages/accountpages/accountcoordinator'
import AccountPromotor from '../../Pages/accountpages/accountpromotor'
import AddOnderwerp from '../../Pages/onderwerpentoevoegen/addonderwerp';
import AddOnderwerpBedrijf from '../../Pages/onderwerpentoevoegen/addonderwerpbedrijf'
import HomePagina from '../../Pages/home';
import Indienen from '../../Pages/indienen';
import OnderwerpenLijst from '../../Pages/onderwerpen';
import OnderwerpenLijstMetVerwijderen from '../../Pages/onderwerpenmetverwijderen'
import OnderwerpenLijstPromotor from '../../Pages/onderwerpenpromotor'
import OnderwerpenLijstBedrijf from '../../Pages/onderwerpenbedrijf'
import OnderwerpDetail from '../../Pages/onderwerpdetail'
import UserLijst from '../../Pages/users'
import Phases from '../../Pages/phases'
import None from '../../Pages/faseNone'
import Toewijzen from '../../Pages/toewijzen'
import ToewijzingStudent from '../../Pages/toewijzingen/toewijzingstudent'
import ToewijzingBedrijf from '../../Pages/toewijzingen/toewijzingbedrijf'
import ToewijzingPromotor from '../../Pages/toewijzingen/toewijzingpromotor'
import Boosten from '../../Pages/boosten'
import ChangePassword from '../../Pages/changepassword'
import Login from '../Login/Login';
import Missing from '../Missing/Missing'
import RequireAuth from '../Authorization/RequireAuth'
import UnAuthorized from '../Authorization/Unauthorized'
import PersistLogin from '../Login/PersistLogin'
import {Routes, Route} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../API/axios'
import React, {useEffect, useState} from 'react';
import LayoutStudentSubjects from '../Layout/Subjects/LayoutStudentSubjects';
import LayoutAdminSubjects from '../Layout/Subjects/LayoutAdminSubjects';
import LayoutCoordinatorSubjects from '../Layout/Subjects/LayoutCoodinatorSubjects'
import LayoutBedrijfSubjects from '../Layout/Subjects/LayoutBedrijfSubjects'
import LayoutPromotorSubjects from '../Layout/Subjects/LayoutPromotorSubjects'
import LayoutStudentChoice from '../Layout/Choice/LayoutStudentChoice';
import LayoutAdminChoice from '../Layout/Choice/LayoutAdminChoice';
import LayoutCoordinatorChoice from '../Layout/Choice/LayoutCoodinatorChoice'
import LayoutBedrijfChoice from '../Layout/Choice/LayoutBedrijfChoice'
import LayoutPromotorChoice from '../Layout/Choice/LayoutPromotorChoice'
import LayoutStudentBoost from '../Layout/Boost/LayoutStudentBoost';
import LayoutAdminBoost from '../Layout/Boost/LayoutAdminBoost';
import LayoutCoordinatorBoost from '../Layout/Boost/LayoutCoodinatorBoost'
import LayoutBedrijfBoost from '../Layout/Boost/LayoutBedrijfBoost'
import LayoutPromotorBoost from '../Layout/Boost/LayoutPromotorBoost'
import LayoutStudentAssign from '../Layout/Assign/LayoutStudentAssign';
import LayoutAdminAssign from '../Layout/Assign/LayoutAdminAssign';
import LayoutCoordinatorAssign from '../Layout/Assign/LayoutCoodinatorAssign'
import LayoutBedrijfAssign from '../Layout/Assign/LayoutBedrijfAssign'
import LayoutPromotorAssign from '../Layout/Assign/LayoutPromotorAssign'
import LayoutStudentRest from '../Layout/Rest/LayoutStudentRest';
import LayoutAdminRest from '../Layout/Rest/LayoutAdminRest';
import LayoutCoordinatorRest from '../Layout/Rest/LayoutCoodinatorRest'
import LayoutBedrijfRest from '../Layout/Rest/LayoutBedrijfRest'
import LayoutPromotorRest from '../Layout/Rest/LayoutPromotorRest'
import LayoutAdmin from '../Layout/LayoutAdmin'

function App() {
    const [phase, setPhase] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const ROLES = {
        1: 'Admin',
        2: 'Student',
        3: 'Coordinator',
        4: 'Bedrijf',
        5: 'Promotor',
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
    }, [navigate])
    return (
        phase==="Subjects" ?
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/unauthorized" element={<UnAuthorized/>}/>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/" element={<LayoutAdminSubjects/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                        <Route path='/admin/' element={<HomePagina/>}/>
                        <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                        <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/admin/users' element={<UserLijst/>}/>
                        <Route path='/admin/phases' element={<Phases />} />
                        <Route path='/admin/account' element={<Accountadmin/>}/>
                        <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutStudentSubjects/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                        <Route path='/student/' element={<HomePagina/>}/>
                        <Route path='/student/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/student/account' element={<AccountStudent/>}/>
                        <Route path='/student/account/changepassword' element={<ChangePassword/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutCoordinatorSubjects/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                        <Route path='/coordinator/' element={<HomePagina/>}/>
                        <Route path='/coordinator/onderwerpen' element={<OnderwerpenLijstMetVerwijderen />}/>
                        <Route path='/coordinator/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/coordinator/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/coordinator/account' element={<AccountCoordinator/>}/>
                        <Route path='/coordinator/account/changepassword' element={<ChangePassword/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutBedrijfSubjects/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                        <Route path='/bedrijf/' element={<HomePagina/>}/>
                        <Route path='/bedrijf/onderwerpen' element={<OnderwerpenLijstBedrijf />}/>
                        <Route path='/bedrijf/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/bedrijf/addonderwerp' element={<AddOnderwerpBedrijf/>}/>
                        <Route path='/bedrijf/account' element={<AccountBedrijf/>}/>
                        <Route path='/bedrijf/account/changepassword' element={<ChangePassword/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<LayoutPromotorSubjects/>}>
                <Route element={<PersistLogin/>}>
                    {/* protected routes */}
                    <Route path="/promotor/" element={<RequireAuth AllowedRoles={[ROLES["5"]]}/>}>
                        <Route path='/promotor/' element={<HomePagina/>}/>
                        <Route path='/promotor/onderwerpen' element={<OnderwerpenLijstPromotor />}/>
                        <Route path='/promotor/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                        <Route path='/promotor/addonderwerp' element={<AddOnderwerp/>}/>
                        <Route path='/promotor/account' element={<AccountPromotor/>}/>
                        <Route path='/promotor/account/changepassword' element={<ChangePassword/>}/>
                    </Route>
                </Route>
            </Route>
            {/* catch all */}
            <Route path="*" element={<Missing/>}/>
        </Routes>
            : phase==="Choice" ?
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/unauthorized" element={<UnAuthorized/>}/>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/" element={<LayoutAdminChoice/>}>
                        <Route element={<PersistLogin/>}>
                            {/* protected routes */}
                            <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                                <Route path='/admin/' element={<HomePagina/>}/>
                                <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                                <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                                <Route path='/admin/users' element={<UserLijst/>}/>
                                <Route path='/admin/phases' element={<Phases />} />
                                <Route path='/admin/account' element={<Accountadmin/>}/>
                                <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/" element={<LayoutStudentChoice/>}>
                        <Route element={<PersistLogin/>}>
                            {/* protected routes */}
                            <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                                <Route path='/student/' element={<HomePagina/>}/>
                                <Route path='/student/onderwerpen' element={<OnderwerpenLijst/>}/>
                                <Route path='/student/onderwerpen/:id' element = {<OnderwerpDetail />}/>
                                <Route path='/student/indienen' element={<Indienen/>}/>
                                <Route path='/student/account' element={<AccountStudent/>}/>
                                <Route path='/student/account/changepassword' element={<ChangePassword/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/" element={<LayoutCoordinatorChoice/>}>
                        <Route element={<PersistLogin/>}>
                            {/* protected routes */}
                            <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                                <Route path='/coordinator/' element={<HomePagina/>}/>
                                <Route path='/coordinator/onderwerpen' element={<OnderwerpenLijstMetVerwijderen />}/>
                                <Route path='/coordinator/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                <Route path='/coordinator/account' element={<AccountCoordinator/>}/>
                                <Route path='/coordinator/account/changepassword' element={<ChangePassword/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/" element={<LayoutBedrijfChoice/>}>
                        <Route element={<PersistLogin/>}>
                            {/* protected routes */}
                            <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                                <Route path='/bedrijf/' element={<HomePagina/>}/>
                                <Route path='/bedrijf/onderwerpen' element={<OnderwerpenLijstBedrijf />}/>
                                <Route path='/bedrijf/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                <Route path='/bedrijf/account' element={<AccountBedrijf/>}/>
                                <Route path='/bedrijf/account/changepassword' element={<ChangePassword/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/" element={<LayoutPromotorChoice/>}>
                        <Route element={<PersistLogin/>}>
                            {/* protected routes */}
                            <Route path="/promotor/" element={<RequireAuth AllowedRoles={[ROLES["5"]]}/>}>
                                <Route path='/promotor/' element={<HomePagina/>}/>
                                <Route path='/promotor/onderwerpen' element={<OnderwerpenLijstPromotor />}/>
                                <Route path='/promotor/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                <Route path='/promotor/account' element={<AccountPromotor/>}/>
                                <Route path='/promotor/account/changepassword' element={<ChangePassword/>}/>
                            </Route>
                        </Route>
                    </Route>
                    {/* catch all */}
                    <Route path="*" element={<Missing/>}/>
                </Routes>
                : phase==="Boost" ?
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/unauthorized" element={<UnAuthorized/>}/>
                        <Route path="/" element={<StartPage/>}/>
                        <Route path="/" element={<LayoutAdminBoost/>}>
                            <Route element={<PersistLogin/>}>
                                {/* protected routes */}
                                <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                                    <Route path='/admin/' element={<HomePagina/>}/>
                                    <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                                    <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                    <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                                    <Route path='/admin/users' element={<UserLijst/>}/>
                                    <Route path='/admin/phases' element={<Phases />} />
                                    <Route path='/admin/account' element={<Accountadmin/>}/>
                                    <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/" element={<LayoutStudentBoost/>}>
                            <Route element={<PersistLogin/>}>
                                {/* protected routes */}
                                <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                                    <Route path='/student/' element={<HomePagina/>}/>
                                    <Route path='/student/onderwerpen' element={<OnderwerpenLijst/>}/>
                                    <Route path='/student/onderwerpen/:id' element = {<OnderwerpDetail />}/>
                                    <Route path='/student/account' element={<AccountStudent/>}/>
                                    <Route path='/student/account/changepassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/" element={<LayoutCoordinatorBoost/>}>
                            <Route element={<PersistLogin/>}>
                                {/* protected routes */}
                                <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                                    <Route path='/coordinator/' element={<HomePagina/>}/>
                                    <Route path='/coordinator/onderwerpen' element={<OnderwerpenLijstMetVerwijderen />}/>
                                    <Route path='/coordinator/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                    <Route path='/coordinator/account' element={<AccountCoordinator/>}/>
                                    <Route path='/coordinator/account/changepassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/" element={<LayoutBedrijfBoost/>}>
                            <Route element={<PersistLogin/>}>
                                {/* protected routes */}
                                <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                                    <Route path='/bedrijf/' element={<HomePagina/>}/>
                                    <Route path='/bedrijf/onderwerpen' element={<OnderwerpenLijstBedrijf />}/>
                                    <Route path='/bedrijf/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                    <Route path='/bedrijf/account' element={<AccountBedrijf/>}/>
                                    <Route path='/bedrijf/account/changepassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/" element={<LayoutPromotorBoost/>}>
                            <Route element={<PersistLogin/>}>
                                {/* protected routes */}
                                <Route path="/promotor/" element={<RequireAuth AllowedRoles={[ROLES["5"]]}/>}>
                                    <Route path='/promotor/' element={<HomePagina/>}/>
                                    <Route path='/promotor/onderwerpen' element={<OnderwerpenLijstPromotor />}/>
                                    <Route path='/promotor/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                    <Route path='/promotor/boosten' element={<Boosten/>}/>
                                    <Route path='/promotor/account' element={<AccountPromotor/>}/>
                                    <Route path='/promotor/account/changepassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                        </Route>
                        {/* catch all */}
                        <Route path="*" element={<Missing/>}/>
                    </Routes>
                    :phase === "Assign" ?
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/unauthorized" element={<UnAuthorized/>}/>
                            <Route path="/" element={<StartPage/>}/>
                            <Route path="/" element={<LayoutAdminAssign/>}>
                                <Route element={<PersistLogin/>}>
                                    {/* protected routes */}
                                    <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                                        <Route path='/admin/' element={<HomePagina/>}/>
                                        <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                                        <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                        <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                                        <Route path='/admin/users' element={<UserLijst/>}/>
                                        <Route path='/admin/phases' element={<Phases />} />
                                        <Route path='/admin/account' element={<Accountadmin/>}/>
                                        <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/" element={<LayoutStudentAssign/>}>
                                <Route element={<PersistLogin/>}>
                                    {/* protected routes */}
                                    <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                                        <Route path='/student/' element={<HomePagina/>}/>
                                        <Route path='/student/onderwerpen' element={<OnderwerpenLijst/>}/>
                                        <Route path='/student/onderwerpen/:id' element = {<OnderwerpDetail />}/>
                                        <Route path='/student/toewijzing' element={<ToewijzingStudent/>}/>
                                        <Route path='/student/account' element={<AccountStudent/>}/>
                                        <Route path='/student/account/changepassword' element={<ChangePassword/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/" element={<LayoutCoordinatorAssign/>}>
                                <Route element={<PersistLogin/>}>
                                    {/* protected routes */}
                                    <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                                        <Route path='/coordinator/' element={<HomePagina/>}/>
                                        <Route path='/coordinator/onderwerpen' element={<OnderwerpenLijstMetVerwijderen />}/>
                                        <Route path='/coordinator/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                        <Route path='/coordinator/toewijzen' element={<Toewijzen />}/>
                                        <Route path='/coordinator/account' element={<AccountCoordinator/>}/>
                                        <Route path='/coordinator/account/changepassword' element={<ChangePassword/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/" element={<LayoutBedrijfAssign/>}>
                                <Route element={<PersistLogin/>}>
                                    {/* protected routes */}
                                    <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                                        <Route path='/bedrijf/' element={<HomePagina/>}/>
                                        <Route path='/bedrijf/onderwerpen' element={<OnderwerpenLijstBedrijf />}/>
                                        <Route path='/bedrijf/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                        <Route path='/bedrijf/toewijzing' element={<ToewijzingBedrijf/>}/>
                                        <Route path='/bedrijf/account' element={<AccountBedrijf/>}/>
                                        <Route path='/bedrijf/account/changepassword' element={<ChangePassword/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/" element={<LayoutPromotorAssign/>}>
                                <Route element={<PersistLogin/>}>
                                    {/* protected routes */}
                                    <Route path="/promotor/" element={<RequireAuth AllowedRoles={[ROLES["5"]]}/>}>
                                        <Route path='/promotor/' element={<HomePagina/>}/>
                                        <Route path='/promotor/onderwerpen' element={<OnderwerpenLijstPromotor />}/>
                                        <Route path='/promotor/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                        <Route path='/promotor/toewijzing' element={<ToewijzingPromotor />}/>
                                        <Route path='/promotor/account' element={<AccountPromotor/>}/>
                                        <Route path='/promotor/account/changepassword' element={<ChangePassword/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            {/* catch all */}
                            <Route path="*" element={<Missing/>}/>
                        </Routes>
                        :phase === "Rest" ?
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/unauthorized" element={<UnAuthorized/>}/>
                                <Route path="/" element={<StartPage/>}/>
                                <Route path="/" element={<LayoutAdminRest/>}>
                                    <Route element={<PersistLogin/>}>
                                        {/* protected routes */}
                                        <Route path="/admin/" element={<RequireAuth AllowedRoles={[ROLES["1"]]}/>}>
                                            <Route path='/admin/' element={<HomePagina/>}/>
                                            <Route path='/admin/onderwerpen' element={<OnderwerpenLijstMetVerwijderen/>}/>
                                            <Route path='/admin/onderwerpen/:id' exact element = {<OnderwerpDetail />}/>
                                            <Route path='/admin/addonderwerp' element={<AddOnderwerp/>}/>
                                            <Route path='/admin/users' element={<UserLijst/>}/>
                                            <Route path='/admin/phases' element={<Phases />} />
                                            <Route path='/admin/account' element={<Accountadmin/>}/>
                                            <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                                <Route path="/" element={<LayoutStudentRest/>}>
                                    <Route element={<PersistLogin/>}>
                                        {/* protected routes */}
                                        <Route path="/student" element={<RequireAuth AllowedRoles={[ROLES["2"]]}/>}>
                                            <Route path='/student/' element={<HomePagina/>}/>
                                            <Route path='/student/account' element={<AccountStudent/>}/>
                                            <Route path='/student/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                                <Route path="/" element={<LayoutCoordinatorRest/>}>
                                    <Route element={<PersistLogin/>}>
                                        {/* protected routes */}
                                        <Route path="/coordinator/" element={<RequireAuth AllowedRoles={[ROLES["3"]]}/>}>
                                            <Route path='/coordinator/' element={<HomePagina/>}/>
                                            <Route path='/coordinator/account' element={<AccountCoordinator/>}/>
                                            <Route path='/coordinator/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                                <Route path="/" element={<LayoutBedrijfRest/>}>
                                    <Route element={<PersistLogin/>}>
                                        {/* protected routes */}
                                        <Route path="/bedrijf/" element={<RequireAuth AllowedRoles={[ROLES["4"]]}/>}>
                                            <Route path='/bedrijf/' element={<HomePagina/>}/>
                                            <Route path='/bedrijf/account' element={<AccountBedrijf/>}/>
                                            <Route path='/bedrijf/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                                <Route path="/" element={<LayoutPromotorRest/>}>
                                    <Route element={<PersistLogin/>}>
                                        {/* protected routes */}
                                        <Route path="/promotor/" element={<RequireAuth AllowedRoles={[ROLES["5"]]}/>}>
                                            <Route path='/promotor/' element={<HomePagina/>}/>
                                            <Route path='/promotor/account' element={<AccountPromotor/>}/>
                                            <Route path='/promotor/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                                {/* catch all */}
                                <Route path="*" element={<Missing/>}/>
                            </Routes>
                            :<Routes><Route path='/*' element={<None />}/>
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
                                            <Route path='/admin/users' element={<UserLijst/>}/>
                                            <Route path='/admin/phases' element={<Phases />} />
                                            <Route path='/admin/account' element={<Accountadmin/>}/>
                                            <Route path='/admin/account/changepassword' element={<ChangePassword/>}/>
                                        </Route>
                                    </Route>
                                </Route></Routes>
    );
}

export default App;
