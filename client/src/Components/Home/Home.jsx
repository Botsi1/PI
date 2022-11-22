import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Paging from '../Paging/Paging';
import stl from './Home.module.css'
import SearchBar from '../SearchBar/SearchBar';
import Loader from "../Loader/Loader"
import { getvgames, genrefilter, vgorigin, sortvgames, getgenres } from '../../Redux/actions'

export default function HomePage() {
    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames)
    const allgenres = useSelector((state) => state.genres)
    const [currentPage, setCurrentPage] = useState(1)
    const [vgamesPerPage, setvgamesPerPage] = useState(15)
    const lastVgameIndex = currentPage * vgamesPerPage
    const firstVgIndex = lastVgameIndex - vgamesPerPage
    const currentVgames = allVgames.slice(firstVgIndex, lastVgameIndex)
    const [charge, setCharge] = useState(false)
    const [render, setRender] = useState('')
    const actualPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    console.log(setvgamesPerPage, render)



    useEffect(() => {
       
        dispatch(getgenres());
    }, [dispatch])

    useEffect(() => {
        setCharge(true);
        setTimeout(() => {
            setCharge(false);
        }, 2000);
        dispatch(getvgames());
    }, [dispatch]);





    function handleGenreFilter(e) {
        e.preventDefault();
        dispatch(genrefilter(e.target.value))
        setCurrentPage(1)
    }

    function handleOriginFilter(e) {
        dispatch(vgorigin(e.target.value))
        setCurrentPage(1)
    }

    function handleShowAll(e) {
        dispatch(vgorigin('All'))
        dispatch(sortvgames('asc'))
        setCurrentPage(1)
        

    }

    function handleSortvgames(e) {
        e.preventDefault();

        setRender(`Order ${e.target.value}`)
        dispatch(sortvgames(e.target.value))
        setCurrentPage(1)

    }

    return (
        <div className={stl.c1}>
            <div className={stl.c2}>
                <div>
                    <button className={stl.hpbot} onClick={e => { handleShowAll(e) }}>Load all videogames</button>
                </div>
                <div>
                    <Link to='/videogame'>
                        <button className={stl.hpbot}>Add New Videogame</button>
                    </Link>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <select className={stl.hpfilter} onChange={e => handleGenreFilter(e)}>
                        {allgenres.sort().map(e => {
                            return <option value={e}>{e}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select className={stl.hpfilter} onChange={e => handleSortvgames(e)} onBlur={e => handleSortvgames(e)}>
                        <option value='asc'>ALL</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                        <option value='rating'>Rating</option>
                        <option value='date'>Date</option>
                    </select>
                </div>
                <div>
                    <select className={stl.hpfilter} onChange={e => handleOriginFilter(e)}>
                        <option value='All'>Api+DB Games</option>
                        <option value='DB'>Db Games</option>
                        <option value='API'>Api Games</option>
                    </select>
                </div>
            </div>

            <div className={stl.c4}>

                <Paging vgamesPerPage={vgamesPerPage} allVgames={allVgames.length} currpage={currentPage} actualPage={actualPage} />

            </div>
            <div className={stl.c5}> {/*ACA NO MAPEO TODOS LOS VGAMES SINO SOLO LOS DE LA PAGINA ACTUAL del Slice */}
                {charge ? (
                    <div>
                        <Loader />
                    </div>
                ) : currentVgames && currentVgames.map(p => {
                    return (
                        <>
                            <Link style={{ textDecoration: 'none' }} to={"/videogame/" + p.id}>
                                <Card name={p.name} image={p.image} genres={p.genres} key={p.id} rating={p.rating} />
                            </Link>
                        </>
                    )
                })
                }
            </div>
        </div>
    )
}