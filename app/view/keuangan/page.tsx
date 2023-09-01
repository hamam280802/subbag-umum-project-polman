'use client'

import Header from "../header/page";
import AddUang from "./adduang";
import DeleteUang from "./deleteuang";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Keuangan() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getMoney() {
            try {
                const res = await axios.get('/api/mons', { headers: { 'Cache-Control': 'no-store' } });
                const fullData = res.data;
                if (res.status !== 200) {
                    return new Error("Gagal terhubung ke database")
                }
                setData(fullData.mons)
            } catch (error) {
                console.log("Error memuat database: ", error);
            }
        }
        getMoney();
    }, [])

    return (
        <div>
            <Header title="keuangan"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Keuangan</p>
                    <AddUang/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-5/6 border-2">
                        <ul className="p-4">{
                            data.map((linkmons:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkmons._id}`} className="flex justify-between">
                                    <a href={linkmons.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                        <p>{linkmons.title}</p>
                                    </li></a>
                                    <DeleteUang {...linkmons}/>
                                </div>
                            ))
                        }</ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
