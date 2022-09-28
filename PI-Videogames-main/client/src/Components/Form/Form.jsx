import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postvgame, getvgames, getgenres } from '../../Redux/actions';



import stl from './Form.module.css';



export default function AddVideogame() {


    let videogamesnames = useSelector((state) => state.videogames).map(e => e.name)

    function validate(input) {
        let errors = {}
        if (!input.name) {
            errors.name = 'Name is required'
        } else if (!input.rating || input.rating < 0 || input.rating > 5) {
            errors.rating = 'Rating must be a nummber between 0-5'
        } else if (input.platform.length === 0) {
            errors.platform = 'Platform is required'
        } else if (input.genre.length === 0) {
            errors.genre = "Genre is required"
        }
        return errors
    }



    const dispatch = useDispatch()
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        description: '',
        reldate: '',
        image: '',
        rating: '',
        platform: [],
        genre: []
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getgenres())
    }, [dispatch])


    useEffect(() => {
        dispatch(getvgames())
    }, [dispatch])







    let allgenres = useSelector((state) => state.genres)





    allgenres = allgenres.filter(p => p !== 'All')

    function handleOnChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input, [e.target.name]: e.target.value
        }))
    }

    function handlePlatforms(e) {
        console.log('Platform: ', e.target.value)
        if (e.target.value === "Select") return alert("Select a platform")
        setInput({
            ...input,
            platform: [...input.platform, e.target.value]

        })


    }

    function handleGenres(e) {
        if (e.target.value === "Select") return alert("Select a genre")
        setInput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!input.name) { return alert('Name is required') }
        if (videogamesnames.includes(input.name)) { return alert("There is a game with this name") }
        if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(input.reldate)) { return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D') }
        if (!input.rating) { return alert('Rating is required') }
        if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) ||
            input.rating < 0 || input.rating > 5) {
            return alert('Wrong format for Rating. Should be a number between 0-5')
        }
        if (input.platform.length === 0) { return alert('Platform is required') }
        if (input.genre.length === 0) { return alert("The genre is required") }
        if (!input.description) { return alert("add a description") }
        console.log("mi input", input)
        dispatch(postvgame(input))
        dispatch(getvgames())
        alert(`Videogame ${input.name} has been added`)
        setInput({
            name: '',
            description: '',
            reldate: '',
            rating: 0,
            platform: [],
            genre: []
        })
        history.push('/home')
    }

    return (
        <>
            <div className={stl.avgwrapper}>
                <h1 className={stl.h1}>Add your own videogame</h1>
                <form className={stl.formarea} onSubmit={handleSubmit}>

                    <div className={stl.msgarea}>
                        <label>Description:</label>
                        <textarea onChange={handleOnChange} type='text' name='description' value={input.description} />
                    </div>
                    <div className={stl.detailsarea}>
                        <label>Game Name:</label>
                        <input onChange={handleOnChange} onBlur={handleOnChange}
                            type='text' name='name' value={input.name} />
                        {errors.name && (<p className={stl.error}> {errors.name} </p>)}

                        <label>Released date:</label>
                        <input onChange={handleOnChange} type='text' name='reldate' value={input.reldate}
                            placeholder='YYYY-MM-DD' />

                        <label>Rating:</label>
                        <input onChange={handleOnChange} onBlur={handleOnChange}
                            type='text' name='rating' value={input.rating} placeholder='ex 4.3' />
                        {errors.rating && (<p className={stl.error}> {errors.rating} </p>)}

                        <label>Platforms:</label>
                        <select name='Platforms' className={stl.platform} value={input.platform} onChange={handlePlatforms} onBlur={handleOnChange}>
                            <option >Select</option>
                            <option value="PC">PC</option>
                            <option value="Playstation 5">Playstation 5</option>
                            <option value="Xbox Series S/X">Xbox Series S/X</option>
                            <option value="Playstation 4">Playstation 4</option>
                            <option value="Xbox One">Xbox One</option>
                            <option value="Playstation 3">Playstation 3</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="Playstation 2">Playstation 2</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                            <option value="Linux">Linux</option>
                            <option value="macOs">macOs</option>
                            <option value="Android">Android</option>
                            <option value="PS vita">PS vita</option>


                        </select>
                        <ul className='ul'><li>{input.platform.map(p => p + ' ,')}</li></ul>
                        {errors.platform && (<p className={stl.error}> {errors.platform} </p>)}



                        <label>Genres:</label>
                        <select onChange={handleGenres} className={stl.genre}>
                            <option>Select</option>
                            {allgenres.sort().map(p => {
                                return (<option value={p}>{p}</option>)
                            })}
                        </select>
                        {errors.genre && (<p className={stl.error}> {errors.genre} </p>)}

                        <ul ><li>{input.genre.map(p => p + ' ,')}</li></ul>

                        <button className={stl.bot} type='submit'>Add Game</button>
                        <span><Link to='/home'><button className={stl.bot2}>Back To Home</button></Link> </span>
                    </div>
                </form>
            </div>
            <div />
        </>
    )
}