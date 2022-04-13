import React, { useState } from "react";

function ListingCard({listing, handleDeleteClick}) {
  const [like, setLike] = useState(false)
  /* alternative syntax for onClick
  function handleClick() {
   setLike(!like)
  }
  */

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image} alt={listing.description} />
      </div>
      <div className="details">
        {like ? (
          <button className="emoji-button favorite active" onClick={() => setLike(false)}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={() => setLike(true)}>☆</button>
        )}
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button className="emoji-button delete" onClick={() => handleDeleteClick(listing)}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
