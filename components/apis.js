import React from "react";
const commonurl = "https://api.themoviedb.org/3/";

const params = new URLSearchParams();
params.append("api_key", process.env.NEXT_PUBLIC_API_KEY);
params.append("language", "en-US");
export const fetchData = async({ path, page = null, query = null }) => {
  if (page !== null) {
    params.append("page", page);
  }
  if (query !== null) {
    params.append("query", query);
  }
  try {
    const response = await fetch(
      `${commonurl}/${path}?${params.toString()}`
    );
    return  response.ok === false?'error': response.json()
  } catch (error) {
    console.error("Error:", error);
    return 'error'
  }
};



export const imageUrl=(path)=>{
return `https://image.tmdb.org/t/p/w500${path}`
}