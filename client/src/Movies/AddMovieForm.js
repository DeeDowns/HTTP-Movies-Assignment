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
    const [actors, setActors] = useState('')

    const addMovie = event => {
        event.preventDefault()
        axios.post(`http://localhost:5000/api/movies/`, inputValues)
        .then(res => {
            console.log(res)
            props.setMovieList(res.data)
            history.push('/')
            
        })
        .catch(err => {
            console.log(err)
        })
    }

      const handleChange = event => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
           
        })
    }

    const handleActor = event => {
        event.preventDefault()
        setInputValues({
            ...inputValues,
            stars: [...inputValues.stars, actors]
        })
        setActors('')
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

            <label htmlFor='stars'>Actors</label>
            <textarea 
                type='text'
                name='stars'
                id='stars'
                onChange={(e) => setActors(e.target.value)}
                value={actors}
           />
           <button onClick={handleActor}>Add Actors</button>
           <button>Add Movie</button>
       </form>
    )
}

export default AddMovieForm