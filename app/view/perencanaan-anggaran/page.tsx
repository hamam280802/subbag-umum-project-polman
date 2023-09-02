'use client'

import Header from "../header/page";
import AddRencana from "./addrencana";
import DeleteRencana from "./deleterencana";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Perencanaan_Anggaran() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTag, setSearchTag] = useState(false);

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

    function searchLink(e:any){
        const keyWord = e.target.value;
        console.log(keyWord);
        const filtered = data.filter((item:any)=>{
            return item?.title.toLowerCase().includes(keyWord?.toLowerCase());
        })
        setSearch(filtered);
        setSearchTag(true)
    }

    return (
        <div>
            <Header title="perencanaan-anggaran"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="mb-5 sm:flex justify-between space-y-4 sm:space-y-0">
                    <div className="space-x-2 flex items-center">
                        <p className="sm:text-2xl text-xl font-semibold">Fungsi Perencanaan Anggaran</p>
                        <AddRencana/>
                    </div>
                    <input type="text" onChange={searchLink} placeholder="Cari link disini" className="p-2 border shadow-inner bg-gray-50 rounded-lg w-96 focus:outline-none"/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner sm:h-5/6 border-2">
                        <ul className="p-2 sm:p-4">{
                            searchTag ? 
                                search.map((linkmans:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkmans._id}`} className="flex justify-between">
                                        <a href={linkmans.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                            <p>{linkmans.title}</p>
                                        </li></a>
                                        <DeleteRencana {...linkmans}/>
                                    </div>
                                ))
                            :
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
