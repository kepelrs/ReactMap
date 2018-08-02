import React from 'react';

function SearchBox(props) {
  return(
    <div className="filter-locations light-bottom-border">
      <input
        aria-label="Filter city list"
        role="search"
        className='search-contacts'
        type='text'
        placeholder='&#xF002; Search'
        onChange={(event) => props.filterCities(event.target.value)}
      />
    </div>
  )
}

export default SearchBox;