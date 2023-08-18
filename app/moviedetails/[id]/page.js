"use client";
import { fetchData, imageUrl } from "@/components/apis";
import React, { useEffect, useState } from "react";

const Details = ({ params }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([
   
  ]);
  const [status, setStatus] = useState("complete");

  const movie_id = params.id;
  const getData = async () => {
    setStatus("loading");
    const res = await fetchData({ path: `movie/${movie_id}` });
    const cast = await fetchData({ path: `movie/${movie_id}/credits` });
    console.log(res);
    console.log(cast);
    if (res === "error" || cast === "error") {
      setStatus("error");
    } else {
      setMovieDetails(res);
      setCast(cast.cast);
      setStatus("complete");
    }
  };
  useEffect(() => {
    getData();
  }, [movie_id]);
  if (status === "loading") {
    return <div className="text-white bg-slate-800 flex justify-center items-center w-screen h-screen">loading...</div>;
  }
  return (
    <div className="w-full dark:bg-slate-800 bg-slate-200 pt-28 flex items-center text-gray-800 dark:text-white flex-col">
      <div className="w-11/12 rounded-lg bg-slate-400 dark:bg-slate-950 flex ">
        <div className="w-1/2 p-6">
          <div className="flex gap-4">
            <img
              className="w-[200px]  h-[300px]"
              src={imageUrl(movieDetails.poster_path)}
              alt={movieDetails.original_title}
            />
            <div className="py-4">
              <h1 className="text-3xl font-bold mb-4">
                {movieDetails.original_title}
              </h1>
              <p className="text-blue-800 dark:text-blue-500 mb-3">
                Rating: {movieDetails.vote_average}
              </p>
              <p className="mb-2 text-gray-800 dark:text-slate-300">{movieDetails.runtime} min</p>
              <p className= "text-gray-800 dark:text-slate-300">
                Realesed Date: {movieDetails.release_date}
              </p>
            </div>
          </div>
          <h2 className="text-4xl mt-3 mb-2">Overview</h2>
          <p className="text-gray-600 dark:text-slate-400">{movieDetails.overview}</p>
        </div>

        <img
          className="w-1/2 rounded-r-lg"
          src={imageUrl(movieDetails.backdrop_path)}
          alt={movieDetails.original_title}
        />
      </div>
      <div >
      <h2 className="font-bold text-4xl self-start ml-16 mt-10 mb-12">Cast</h2>
      <div className="flex flex-wrap gap-3 justify-center">

      {cast.map((item) => (
        <div key={item.cast_id} className="w-[200px] mb-4">
          <img className="w-[200px] h-[300px] text-center" src={imageUrl(item.profile_path)} alt={item.name} />
          <p className="text-xl font-bold mt-3 mb-2 text-gray-800 dark:text-slate-200">{item.name}</p>
          <p>Character : {item.character}</p>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default Details;
