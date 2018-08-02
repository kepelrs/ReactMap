import React from 'react';
import CityItem from './CityItem';

function CityList(props) {
  return (
    <ul className={"locations-list" + (props.menuOpen ? " open" : "")}>
      {props.cities && props.cities.map((city, index)=>(
        <li key={index}>
          <CityItem city={city} displayInfo={props.showInfo}/>
        </li>
      ))}
    </ul>
  )
}

export default CityList;