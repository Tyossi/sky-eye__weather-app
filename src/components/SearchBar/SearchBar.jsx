import React from "react";
import "./SearchBar.css"



const SearchBar = ({ query, fetchData, setQuery, getSearchInput, error, notFound }) => {

    return (
        <div>
            <div className="search-bar-container">  
                <input className="search-bar" type="search reset" value={query} placeholder="search cities..." onChange={(e) => setQuery(e.target.value)} onKeyPress={fetchData} ref={getSearchInput} />
            </div>
           
                <div className="alert__container">
                {
                    notFound ? <div className="search__error">city not found</div> : null
                }

                {
                    error ? <div className="search__error">Please enter a city name</div> : null 
                }
            </div>
            
        </div>


    )
};

export default SearchBar;