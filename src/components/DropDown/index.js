
const DropDown = (props) => {

    let cities = [
        {value:'Manila'}, {value:'Jeddah'}, {value:'Miami'}, {value:'Jakarta'},{value:'Hong Kong'}, {value:'Bangkok'}, {value:'London'}, {value:'Singapore'},
        {value:'Paris'}, {value:'Dubai'}, {value:'New York'}, {value:'Kuala Lumpur'},{value:'Istanbul'}, {value:'Delhi'}, {value:'Rome'},{value:'Boston'},
        {value:'Tokyo'}, {value:'Mecca'}, {value:'Medina'}, {value:'Seoul'}, {value:'Amsterdam'}, {value:'Cairo'},{value:'Berlin'},{value:'Doha'},{value:'Hamburg'},
        {value:'Las Vegas'}, {value:'Shanghai'},{value:'Barcelona'},{value:'Los Angeles'}, {value:'Milan'},  {value:'Manama'}, {value:'Beirut'}, {value:'Cape Town'},
        {value:'Moscow'}, {value:'Madrid'}, {value:'Riyadh'}, {value:'Toronto'}, {value:'Johannesburg'},{value:'Dallas'}, {value:'Taif'},{value:'Atlanta'},
        {value:'Sydney'}, {value:'Munich'},{value:'Budapest'}, {value:'Dammam'},{value:'San Francisco'},{value:'Amman'}, {value:'Casablanca'},{value:'Bogota'},
        {value:'Marrakesh'}, {value:'Cebu City'}, {value:'Abu Dhabi'}, {value:'Porto'}, {value:'Washington D.C.'}, {value:'Colombo'}, {value:'Bucharest'},
        {value:'Rio de Janeiro'}, {value:'Mexico City'}, {value:'São Paulo'},{value:'Zürich'}, {value:'Montreal'},{value:'Tehran'}, {value:'Houston'}, 
    ];
     cities = cities.filter((item)=> item.value.toLowerCase().includes(props.city.toLowerCase()));
     cities = cities.slice(0, 5);
    const city = cities.map((item ,i)=> <li key={i}>{item.value}</li>);
    
    const handleclick = (e) =>{
        props.listCity(e.target.innerText);
    };

  return (
    <div className='drop-down' onClick={handleclick}>
        <ul>{city}</ul>
    </div>
  )
}

export default DropDown
