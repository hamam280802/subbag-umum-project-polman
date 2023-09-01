'use client'

import Header from "../header/page";
import AddUmum from "./addumum";
import DeleteUMum from "./deleteumum";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Umum() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getPublic() {
            try {
                const res = await axios.get('/api/pubs', { headers: { 'Cache-Control': 'no-store' } });
                const fullData = res.data;
                if (res.status !== 200) {
                    return new Error("Gagal terhubung ke database")
                }
                setData(fullData.pubs)
            } catch (error) {
                console.log("Error memuat database: ", error);
            }
        }
        getPublic();
    }, [])

    return (
        <div>
            <Header title="umum"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Umum</p>
                    <AddUmum/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-5/6 border-2">
                        <ul className="p-4">{
                            data.map((linkpubs:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkpubs._id}`} className="flex justify-between">
                                    <a href={linkpubs.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                        <p>{linkpubs.title}</p>
                                    </li></a>
                                    <DeleteUMum {...linkpubs}/>
                                </div>
                            ))
                        }</ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
