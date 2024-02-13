"use client"
"use client"
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import Card from '../card/Card'
import Search from '../search/Search'
import { MdOutlineFavorite } from "react-icons/md";
import { toast } from 'react-toastify';
import cheers from '@/assets/cheers.png'

import './MaincmpStyle.css'
const Maincmp = () => {
    const [beers, setBeers]= useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchKey, SetSearchKey]=useState("");
    const [favorites, setFavorites]=useState([]);
  
    const fetchBeers=()=>{
      setLoading(true);
        fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=6&${searchKey}`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
           return res.json();
        }).then((response)=>{

           if(response.length>=0 && response.length<6){
            
            setBeers([...beers, ...response]);
            SetSearchKey("");
            
           }else{
          setBeers([...beers, ...response]);
           }
          setLoading(false);
        }).catch((error)=>{
          toast("Invalid Request",{
            type:'warning',
            position:'top-right',
            autoClose: 2000,
          })
        })

    }

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      setPage(page + 1);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },[loading]); 
  
    useEffect(() => {
      fetchBeers();
    }, [page,searchKey]);

   const handleSearch =(val)=>{
    setPage(1);
    setBeers([]);
    SetSearchKey(`beer_name=${val}`);
   }

    const toggleFavorite = (id)=>{
       const beer = beers.find((beer)=> beer.id === id);
       
       const isFavorite = favorites.some((fav)=> fav.id===id);
       
       if (isFavorite) {
        setFavorites(favorites.filter((favorite) => favorite.id !== id));
        localStorage.setItem(
          'favorites',
          JSON.stringify(favorites.filter((favorite) => favorite.id !== id))
          
        );
        toast("Removed Successfully",{
          type:'success',
          position:'top-right',
          autoClose: 2000,
        })
      } else {
        setFavorites([...favorites, {...beer,favoriteItem:true} ]);
        localStorage.setItem(
          'favorites',
          JSON.stringify([...favorites, {...beer,favoriteItem:true}])
        );
        toast("Added Successfully",{
          type:'success',
          position:'top-right',
          autoClose: 2000,
        })
      }
    }

  return (
    <div className='main-container'>

     
       

       <div className='search-container'>
         <Search handleSearch={handleSearch}  /> 
         <div className='beer-icon'>
        <Image src={cheers} alt="" width={60} height={60}/>
        </div>
        <div className='gotofavlist'>

            <Link href="/pages/favorite" className='linki'>
            <div className='info text-gray-600'>Favorite List</div>
            < MdOutlineFavorite />
             
        </Link></div>
      
         </div>

       <div className='feed-container'>

         {beers.map((beer,id)=>(
          <Card key={id} beer={beer} toggleFavorite ={toggleFavorite}/>
         ))}

       </div>

       {loading? <div>Loading ...</div> : null}
    </div>
  )
}

export default Maincmp
