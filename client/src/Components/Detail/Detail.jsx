import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getvgamebyid} from '../../Redux/actions'
import stl from './Detail.module.css';
import Loader from '../Loader/Loader';

export default function VideoGameDetails(props) {
    const dispatch = useDispatch()
    const {id} = props.match.params
    const[charge,setCharge] =useState(false)

    
    
    useEffect(() => {
        setCharge(true);
        setTimeout(() => {
          setCharge(false);
        }, 2000);
        dispatch(getvgamebyid(id));
      }, [dispatch]);

    var detail = useSelector((state) => state.videodetails)
    console.log("mi detalle", detail)
    
    return (
        <div className={stl.wrapper}>  
        {charge?(
            <div><Loader/></div>
        ):<div className={stl.contarea}>
        <div className={stl.lineflex}>
        <h2>{detail.name} details</h2>          
        <Link to='/home'>
            <button className={stl.botback}>Home</button>
        </Link> 
        </div>
        <img className={stl.detimg} src= {detail.image} alt="No found" width='250px' heigth='300px' ></img>    
        <h3>Description</h3>
        <h5>{detail.description}</h5>
        <div className={stl.lineflex}>
           <h4>{`Rating:   ${detail.rating}`} </h4>
        </div>
        <div className={stl.lineflex}>
           <h4>{`Released date:  ${detail.year}`}  </h4>
        </div>               
        <h4>{`Platforms:  ${detail.platforms}`}</h4>
        <h4>{`Genres: ${detail.genres}`}</h4>
    </div>    }

                  
        </div>
    )

}