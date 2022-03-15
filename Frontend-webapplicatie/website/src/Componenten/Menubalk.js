import {Link} from 'react-router-dom';
function Menubalk(){
    return(
      <header>
        <div class="w3-top">
            <div class="w3-bar w3-kulblauw w3-card w3-left-align w3-large">
              <a class="w3-bar-item w3-button w3-padding-large w3-white"><Link to='/'>Home</Link></a>
              <a class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/onderwerpen'>Onderwerpen</Link></a>
              <a class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/addonderwerp'>Onderwerp toevoegen</Link></a>
              <a class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/indienen'>Indienen</Link></a>
              <a class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/chat'>Chat</Link></a>
              <a class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/account'>Mijn account</Link></a>
            </div>
        </div>
      </header>
    );
}
export default Menubalk;