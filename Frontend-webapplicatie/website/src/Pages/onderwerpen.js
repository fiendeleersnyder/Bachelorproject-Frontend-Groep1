import axios from 'axios';
async function OnderwerpenLijst() {
    const api = axios.create({
        baseURL:'http://localhost:8080'
    })
    try {
        let data = await api.get('/onderwerpen').then(({data}) => data);
        this.setState({onderwerpen: data})
    } catch (err) {
        console.log(err)
    }
    return (
        <div>
            <p>HIER MOETEN ONDERWERPEN KOMEN TE STAAN</p>
            <p>HIER OOK</p>
            <p>HIER MOETEN ONDERWERPEN KOMEN TE STAAN</p>
            <p>HIER OOK</p>
            <p>HIER MOETEN ONDERWERPEN KOMEN TE STAAN</p>
            <p>HIER OOK</p>
            <p>HIER MOETEN ONDERWERPEN KOMEN TE STAAN</p>
            <p>HIER OOK</p>
            {/*<Onderwerp text='Learn React' />*/}
            {/*<Onderwerp text='Learn React' />*/}
            {this.state.onderwerpen.map(onderwerp => <h3 key={onderwerp.id}>{onderwerp.name}</h3>)}
        </div>
    );
}

export default OnderwerpenLijst;