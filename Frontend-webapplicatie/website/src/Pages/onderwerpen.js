import OnderwerpLijst from '../Componenten/Onderwerpen/OnderwerpLijst'
const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'This is a first meetup',
    contactpersoon: 'HEY HOI IK BEN DE CONTACTPERSOON',
    description:
        'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    discipline1: 'd1',
    discipline2: 'd2',
    discipline3: 'd3',
  },
  {
    id: 'm2',
    title: 'This is a second meetup',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description:
        'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    discipline1: 'd1',
    discipline2: 'd2',
    discipline3: 'd3',
  }
];

function OnderwerpenLijst() {
  return(
    <section>
      <OnderwerpLijst items={DUMMY_DATA}/>
    </section>
);
}

export default OnderwerpenLijst;