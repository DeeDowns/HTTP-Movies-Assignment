import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const initialInputValues = {
    title: '',
    director: '',
    metascore: '',
    // stars: []
}

const MovieForm = (props) => {
    console.log(props)
    const { id } = useParams()
    const history = useHistory()
    const [inputValues, setInputValues] = useState(initialInputValues)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            props.setMovieList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    const handleChange = event => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, /*something*/)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
       <form onSubmit={handleSubmit}>
           <label htmlFor='title'>Title</label>
           <input 
                type='text'
                name='title'
                id='title'
                onChange={handleChange}
                value={props.movieList.title}
           />

            <label htmlFor='director'>Director</label>
            <input 
                type='text'
                name='director'
                id='director'
                onChange={handleChange}
                value={props.movieList.director}
           />

            <label htmlFor='metascore'>Metascore</label>
            <input 
                type='text'
                name='metascore'
                id='metascore'
                onChange={handleChange}
                value={props.movieList.metascore}
           />

            {/* <label htmlFor='stars'>Movie stars</label>
            <input 
                type='text'
                name='stars'
                id='stars'
                // onChange={}
                value={props.movieList.stars}
           /> */}
            {/* onClick={() => history.push(`/movies/${movieList.id}`)} */}
           <button>Update</button>
       </form>
    )
}

export default MovieForm