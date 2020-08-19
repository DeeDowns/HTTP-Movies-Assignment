import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const initialInputValues = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddMovieForm = (props) => {
    
    const history = useHistory()
    const [inputValues , setInputValues] = useState(initialInputValues)

    const addMovie = event => {
        event.preventDefault()
        axios.post(`http://localhost:5000/api/movies/`, inputValues)
        .then(res => {
            console.log(res)
            history.push('/')
            
        })
        .catch(err => {
            console.log(err)
        })
    
    }


      const handleChange = event => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }
   

    return (
       <form onSubmit={addMovie}>
           <label htmlFor='title'>Title</label>
           <input 
                type='text'
                name='title'
                id='title'
                onChange={handleChange}
                value={inputValues.title}
           />

            <label htmlFor='director'>Director</label>
            <input 
                type='text'
                name='director'
                id='director'
                onChange={handleChange}
                value={inputValues.director}
           />

            <label htmlFor='metascore'>Metascore</label>
            <input 
                type='text'
                name='metascore'
                id='metascore'
                onChange={handleChange}
                value={inputValues.metascore}
           />

            {/* <label htmlFor='stars'>Movie stars</label>
            <input 
                type='text'
                name='stars'
                id='stars'
                // onChange={}
                value={props.movieList.stars}
           /> */}
           <button>Add Movie</button>
       </form>
    )
}

export default AddMovieForm