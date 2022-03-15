import {Link} from 'react-router-dom';
function Menubalk(){
    return(
      <header>
        <div className="w3-top">
            <div className="w3-bar w3-kulblauw w3-card w3-left-align w3-large">
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/'>Home</Link></a>
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/onderwerpen'>Onderwerpen</Link></a>
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/addonderwerp'>Onderwerp toevoegen</Link></a>
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/indienen'>Indienen</Link></a>
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/chat'>Chat</Link></a>
              <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><Link to='/account'>Mijn account</Link></a>
            </div>
        </div>
      </header>
    );
}
export default Menubalk;