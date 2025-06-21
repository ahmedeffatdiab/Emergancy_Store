import React from 'react';

const StarRating = ({ rating,StarSize }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} style={{ color: 'gold', fontSize: StarSize }}><i class="fa-solid fa-star"></i></span>);
  }

  if (halfStar) {
    stars.push(<span key="half" style={{ color: 'gold', fontSize: StarSize }}><i class="fa-solid fa-star-half-stroke"></i></span>); // Or use a proper half-star icon
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} style={{ color: 'gold', fontSize: StarSize }}><i class="fa-regular fa-star"></i></span>);
  }

  return <div>{stars}</div>;
};

export default StarRating;