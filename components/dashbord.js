'use client'
import React from "react";
import { imageUrl } from "./apis";
import { useRouter } from "next/navigation";

const Dasboard = (props) => {
    const router=useRouter()
  if (props.status==='error'){
        return <div className="flex w-screen h-screen justify-center items-center bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white">Somthing went wrong...</div>
    }
  return (
    <div className="w-[1200px] flex flex-wrap justify-around gap-5 text-slate-800 dark:text-white mt-28">
      {props.list.map((item) => (
        <div key={item.id} onClick={()=>router.push(`/moviedetails/${item.id}`)} className="flex text-center flex-col cursor-pointer gap-3 mb-14">
          <img className="rounded-md w-[230px] h-[350px]" src={imageUrl(item.poster_path)} alt={item.original_title} />
          <p className="text-xl w-[230px]">{item.original_title.length>20?`${item.original_title.slice(0,50)}...`:item.original_title}</p>
          <p>Rating: {item.vote_average}</p>
        </div>
      ))}
    </div>
  );
};

export default Dasboard;
