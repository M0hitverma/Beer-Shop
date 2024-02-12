"use client"
import Card from '@/components/card/Card';
import React, {useEffect,useState} from 'react'
import Link from 'next/link';
import './style.css'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { toast } from 'react-toastify';

export default function Favorite() {

  const [favorites, setFavorites] = useState([]);

useEffect(() => {
          
     setFavorites([...JSON.parse(localStorage.getItem('favorites'))]);


},[])
   
const removeFromFavorite= (id)=>{
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites.filter((favorite) => favorite.id !== id))

    );
    toast("Added Successfully",{
        type:'success',
        position:'top-right',
        autoClose: 2000,
      })
}


  return (
    <div className='favorite-div'>
        
        <div className='heading-div'>
        <div className='gotohome'>
            <Link href="/" className='linki'>
            <MdOutlineArrowBackIos />
             <div className='info'>Home</div>
        </Link></div>
        
            <p>Favorite products</p></div>
        <div className='favorite-div-list'>
      {favorites.map((beer,key)=>(
       <Card key={key} beer={beer} toggleFavorite={removeFromFavorite}/>
      ))}
      </div>
    </div>
  );
}
