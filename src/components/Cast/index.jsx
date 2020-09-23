import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { fetchMovieCast } from "../../api/movies";

const Cast = (props) => {
  const [castInfo, setCastInfo] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    fetchMovieCast(id)
      .then((info) => {
        setCastInfo(info);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      {castInfo.length > 0 ? (
        <ul className={styles.list}>
          {castInfo.map((info) => (
            <li key={info.id}>
              {info.profile_path && (
                <>
                  <img
                    className={styles.image}
                    src={`https://image.tmdb.org/t/p/original${info.profile_path}`}
                    alt=""
                  />
                  <p>{info.name}</p>
                  <p>{info.character}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, we don't have any Casts</p>
      )}
    </>
  );
};

export default Cast;
