import './App.css';
import Menubalk from './Componenten/Menubalk';
import Account from './Pages/account';
import AddOnderwerp from './Pages/addonderwerp';
import Chat from './Pages/chat';
import HomePagina from './Pages/home';
import Indienen from './Pages/indienen';
import OnderwerpenLijst from './Pages/onderwerpen';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
        <div>
          <Menubalk />
            <Routes>
                <Route path='/' element={<HomePagina />}/>
                <Route path='/onderwerpen' element={<OnderwerpenLijst />}/>
                <Route path='/addonderwerp' element={<AddOnderwerp />}/>
                <Route path='/indienen' element={<Indienen />}/>
                <Route path='/chat' element={<Chat />}/>
                <Route path='/account' element={<Account />}/>
            </Routes>
        </div>






    //</body>

//    <!-- Header -->
//    <header class="w3-container w3-red w3-center" style="padding:128px 16px">
//      <h1 class="w3-margin w3-jumbo">START PAGE</h1>
//      <p class="w3-xlarge">Template by w3.css</p>
//      <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button>
//    </header>
//
//    <!-- First Grid -->
//    <div class="w3-row-padding w3-padding-64 w3-container">
//      <div class="w3-content">
//        <div class="w3-twothird">
//          <h1>Lorem Ipsum</h1>
//          <h5 class="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
//
//          <p class="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
//            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//            laboris nisi ut aliquip ex ea commodo consequat.</p>
//        </div>
//
//        <div class="w3-third w3-center">
//          <i class="fa fa-anchor w3-padding-64 w3-text-red"></i>
//        </div>
//      </div>
//    </div>
//
//    <!-- Second Grid -->
//    <div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
//      <div class="w3-content">
//        <div class="w3-third w3-center">
//          <i class="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right"></i>
//        </div>
//
//        <div class="w3-twothird">
//          <h1>Lorem Ipsum</h1>
//          <h5 class="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
//
//          <p class="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
//            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//            laboris nisi ut aliquip ex ea commodo consequat.</p>
//        </div>
//      </div>
//    </div>
//
//    <div class="w3-container w3-black w3-center w3-opacity w3-padding-64">
//        <h1 class="w3-margin w3-xlarge">Quote of the day: live life</h1>
//    </div>
//
//    <!-- Footer -->
//    <footer class="w3-container w3-padding-64 w3-center w3-opacity">
//      <div class="w3-xlarge w3-padding-32">
//        <i class="fa fa-facebook-official w3-hover-opacity"></i>
//        <i class="fa fa-instagram w3-hover-opacity"></i>
//        <i class="fa fa-snapchat w3-hover-opacity"></i>
//        <i class="fa fa-pinterest-p w3-hover-opacity"></i>
//        <i class="fa fa-twitter w3-hover-opacity"></i>
//        <i class="fa fa-linkedin w3-hover-opacity"></i>
//     </div>
//     <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
//    </footer>
//    </body>
  );
}

export default App;
