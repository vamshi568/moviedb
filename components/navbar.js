"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "./apis";
import { useRouter } from "next/navigation";
import { MaterialUISwitch } from "./utils";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);
  const [menu,setMenu] = useState(true)

  const router = useRouter();
  const navigation = (e) => {
    e.preventDefault();
    setSearch("");
    setMenu(true)
    router.push(`?search=${search}`);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (mode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [mode]);

  return (
    <>
      <div className="dark:text-slate-200  bg-slate-300 dark:bg-gray-700 text-gray-700 w-full fixed top-0 overflow-hidden hidden sm:flex justify-around items-center py-6">
        <h1
          className="text-3xl dark:text-slate-50 text-gray-800 cursor-pointer"
          onClick={() => router.push("/")}
        >
          MovieDB
        </h1>
        <div className="flex justify-between gap-5 items-center">
          <p>Popular</p>
          <p>Top Rated</p>
          <p>Upcoming</p>
          <form onSubmit={navigation} className="flex gap-2">
            <input
              className="dark:text-black dark:border-0 border-2 border-gray-800 text-black dark:bg-slate-200 rounded-md py-1 px-3 outline-none"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              required
              value={search}
            />
            <button
              className="dark:bg-gray-500 dark:border-0 border-2 border-gray-800 py-1 px-3 rounded-md dark:text-white"
              type="submit"
            >
              Search
            </button>
          </form>
          <button onClick={() => setMode(!mode)} className=" ">
            <MaterialUISwitch />
          </button>{" "}
        </div>
      </div>
      <div className="px-10 dark:text-slate-200  bg-slate-300 dark:bg-gray-700 text-gray-700 w-full fixed top-0 overflow-hidden sm:hidden  py-5">
        <div className="flex   justify-between  items-center">

        <h1
          onClick={() => router.push("/")}
          className="text-xl dark:text-slate-50 text-gray-800 cursor-pointer font-bold opacity-60"
          >
          MovieDB
        </h1>
       {menu?<MenuIcon onClick={()=>setMenu(false)}/>:<CloseIcon onClick={()=>setMenu(true)}/>}
          </div>

       {!menu?
        <form onSubmit={navigation} className="flex gap-2 mt-3">
          <input
            className="dark:text-black dark:border-0 border-2 px-3 w-[180px] border-gray-800 text-black dark:bg-slate-200 rounded-full outline-none"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            required
            value={search}
          />
          <button
            className="dark:bg-gray-500 dark:border-0 border-2 border-gray-800 py-1 px-3 rounded-full dark:text-white"
            type="submit"
          >
            Search
          </button>
        </form>:null}
        <button  onClick={() => setMode(!mode)} className="fixed bottom-6 right-4 ">
            <MaterialUISwitch />
          </button>{" "}
        </div>

    </>
  );
};

export default Navbar;
