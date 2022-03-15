import './App.css';
import Account from './Pages/account';
import AddOnderwerp from './Pages/addonderwerp';
import Chat from './Pages/chat';
import HomePagina from './Pages/home';
import Indienen from './Pages/indienen';
import OnderwerpenLijst from './Pages/onderwerpen';
import Layout from './Componenten/Layout/Layout';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePagina />}/>
                <Route path='/onderwerpen' element={<OnderwerpenLijst />}/>
                <Route path='/addonderwerp' element={<AddOnderwerp />}/>
                <Route path='/indienen' element={<Indienen />}/>
                <Route path='/chat' element={<Chat />}/>
                <Route path='/account' element={<Account />}/>
            </Routes>
        </Layout>
  );
}

export default App;
