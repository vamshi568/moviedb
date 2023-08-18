"use client";
import { fetchData } from "@/components/apis";
import Dasboard from "@/components/dashbord";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function Home() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("complete");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");


  const fetchList = async () => {
    setStatus('loading')
    if (search) {
      const res = await fetchData({
        path: "search/movie",
        page: page,
        query: search,
      });
      console.log(res);
      if (res === "error") {
        setStatus(res);
      } else {
        setList(res.results);
        setTotalPages(res.total_pages);
        setStatus('complete')
      }
    } else {
      const res = await fetchData({ path: "movie/popular", page: page });
      if (res === "error") {
        setStatus(res);
      } else {
        setList(res.results);
        setTotalPages(res.total_pages);
        setStatus('complete')

      }
    }
    
  };
  useEffect(() => {
    fetchList();
  }, [searchParams, page]);
  if (status==='loading') {
    return <div className="flex w-screen h-screen justify-center items-center bg-slate-100 text-gray-800 dark:bg-gray-800 dark:text-white">loading...</div>
  }
  return (
    <div className="dark:bg-gray-800 bg-slate-200 flex flex-col  items-center">
      <Dasboard list={list} status={status} />
      {status === "complete" ? (
        <div className="mb-9 mt-2 text-gray-800 dark:text-white">
          <Stack spacing={2} >
            <Pagination
            
            variant="outlined"
              count={totalPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Stack>
        </div>
      ) : null}
    </div>
  );
}
