import React, {useState} from "react";

function Search( {listings, setListings} ) {

  //create state variable for search term
  const [search, setSearch] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    const searchedListings = listings.filter((listing) => listing.description.includes(search))
    setListings(searchedListings)
  }
  
  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
