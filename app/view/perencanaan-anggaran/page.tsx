'use client'

import Header from "../header/page";
import AddRencana from "./addrencana";
import DeleteRencana from "./deleterencana";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Perencanaan_Anggaran() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getManagement() {
            try {
                const res = await axios.get('/api/mans', { headers: { 'Cache-Control': 'no-store' } });
                const fullData = res.data;
                if (res.status !== 200) {
                    return new Error("Gagal terhubung ke database")
                }
                setData(fullData.mans)
            } catch (error) {
                console.log("Error memuat database: ", error);
            }
        }
        getManagement();
    }, [])

    return (
        <div>
            <Header title="perencanaan-anggaran"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Perencanaan Anggaran</p>
                    <AddRencana/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-5/6 border-2">
                        <ul className="p-4">{
                            data.map((linkmans:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkmans._id}`} className="flex justify-between">
                                    <a href={linkmans.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                        <p>{linkmans.title}</p>
                                    </li></a>
                                    <DeleteRencana {...linkmans}/>
                                </div>
                            ))
                        }</ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
