import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer( {listings, setListings} ) {
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
//useEffect to fetch data
  useEffect(() => {
    fetch(" http://localhost:6001/listings")
    .then((r) => r.json())
      .then((data) => {
        setListings(data)
      })  
  }, [])
//check that listings array is present
  useEffect(() => {
    console.log("Listings:")
    console.log(listings)
  }, [listings])


  function handleDeleteListing(deletedListing) {
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id)
    setListings(updatedListings)
  }

  function handleDeleteClick(listing) {
    fetch(`http://localhost:6001/listings/${listing.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => handleDeleteListing(listing))
        // 1. find the listing in all listings (based on listing.id) - .filter
        // 2. remove it from all listings by setting state
  }

//description, image and location need to be able to be edited in a form component
  function handleSubmit(e) {
    e.preventDefault();
    const listingData = {
      description: description,
      image: "./images/heater.jpg",
      location: location,
    };
    fetch("http://localhost:6001/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    })
      .then((r) => r.json())
      .then((newListing) => {
        console.log(newListing)
        const allListingsWithNew = [...listings, newListing]
        setListings(allListingsWithNew)
      })
    }

  const allListings = listings.map((listing) => {
    return <ListingCard key={listing.id} listing={listing} listings={listings} setListings={setListings} handleDeleteClick={handleDeleteClick} />
  });

  return (
    <main>
      <ul className="cards">
        {allListings}
        <form onSubmit={handleSubmit}>
          <label htmlFor="description-input">Description:</label>
          <input id="description-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          <label htmlFor="location-input">Location:</label>
          <input id="locatiion-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
          <input type="submit" />
        </form>
      </ul>
    </main>
  );
}

export default ListingsContainer;
