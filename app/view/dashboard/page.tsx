"use client"
import Header from "../header/page";
import ImageEl from "./imageEl";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getCalendar() {
            try {
                const res = await axios.get('/api/cals', { headers: { 'Cache-Control': 'no-store' } });
                const fullData = res.data;
                if (res.status !== 200) {
                    throw new Error("Gagal terhubung ke database")
                }
                const sortedAll = fullData.cals.sort((a:any,b:any)=>{
                    let aDate = new Date(a.start), bDate = new Date(b.end);
                    return aDate.getTime() - bDate.getTime();
                })
                setData(sortedAll);
            } catch (error) {
                console.log("Error memuat database: ", error);
                return null;
            }
        };
        getCalendar();
    }, [])

  return (
    <div>
        <Header/>
        <main>
            <div className="hidden sm:flex mx-5 mt-10">
                <a className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-md border font-semibold hover:cursor-pointer" href="/view/calendar">Buat jadwal</a>
            </div>
            <div className="mx-5 my-5 overflow-y-auto bg-gray-100 rounded-xl shadow-inner sm:h-72 border-l-2 border-t-2 border-b-2">
                <ul className="p-4 space-y-3">{
                    data.map((calevent: {title: string, start: Date, end: Date, id: number}) => (
                        <li key={`${calevent.id}`} className="p-2 sm:p-4 w-full border shadow-lg sm:text-lg bg-white font-semibold rounded-lg">
                            <p>{calevent.title}</p><p>{formatDateTime(calevent.start)} - {formatDateTime(calevent.end)}</p>
                        </li>
                    ))
                }</ul>
            </div>
            <div className="hidden lg:block">
                <ImageEl/>
            </div>
        </main>
    </div>
  )
}

function formatDateTime(date: Date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}
