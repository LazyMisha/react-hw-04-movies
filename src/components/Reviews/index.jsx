import React, { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/movies";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    fetchMovieReviews(id)
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.author}>
              <h4>{`Author: ${review.author}`}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, we don't have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
