"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import './CardStyle.css'
import { FaRegHeart } from "react-icons/fa";
import { LuHeartOff } from "react-icons/lu";

const Card = ({ beer, toggleFavorite } )=> {
const [like,setLike]=useState(false);
  const handleFav=()=>{
    setLike(!like);
         toggleFavorite(beer.id);
  }

  return (
    <div className="beer-card shadow-md">
     <div className='upper-texture'></div>
     
    <div className='img-div'>
      <Image className="image" src={beer.image_url} alt={beer.name} width={300} height={600} />
    </div>

    <div className='info-div'>
      <p id='beer-name'>{beer.name}</p>
      <p id='beer-des'>{beer.description}</p>

      {beer.favoriteItem ? <button  className='fav-btn' onClick={handleFav}><LuHeartOff/></button> : <button 
       className='fav-btn'
        onClick={handleFav}><FaRegHeart /></button>}
    </div>
    
  </div>
  )
}

export default Card
