import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleDelete = event => {
    event.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      // movie.filter(movieItem => {
      //   if(movieItem.id === movie.data) {
      //     return setMovie([...movie, !movieItem])
      //   } else {
      //     return movieItem
      //   }
      // })
      history.push('/')
    })
    .catch(err => {
      console.log(err)
    })

  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => history.push(`/update-movie/${movie.id}`)}>Edit Movie</button>
      <button onClick={handleDelete}>Remove Movie</button>
    </div>
  );
}

export default Movie;
