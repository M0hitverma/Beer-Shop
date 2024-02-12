"use client"
import React,{useState} from 'react';
import { CiBeerMugFull } from "react-icons/ci";
import './SearchStyle.css'

const Search = ({ handleSearch }) => {
    const [inputtext,setInputText]= useState("");

  const submit = () => {
    if(inputtext.length===0){
       handleSearch("random");
    }else{
    handleSearch(inputtext);
    }
  };

  return (
    <div className='search-div shadow-sm'>
    <input type="text"
    className='input-field'
     placeholder="Search beers..."
     value={inputtext}
     
     onChange={(e)=>{
        setInputText(e.target.value);
     }}
     />

    <button onClick={submit}><CiBeerMugFull className='search-icon' /></button>

    </div>
  );
};

export default Search;