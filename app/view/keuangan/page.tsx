'use client'

import Header from "../header/page";
import AddUang from "./adduang";
import DeleteUang from "./deleteuang";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Keuangan() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTag, setSearchTag] = useState(false);

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
            <Header title="keuangan"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                    <div className="mb-5 sm:flex justify-between space-y-4 sm:space-y-0">
                        <div className="space-x-2 flex items-center">
                            <p className="sm:text-2xl text-xl font-semibold">Fungsi Keuangan</p>
                            <AddUang/>
                        </div>
                        <input type="text" onChange={searchLink} placeholder="Cari link disini" className="p-2 border shadow-inner bg-gray-50 rounded-lg w-full sm:w-96 focus:outline-none"/>
                    </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner sm:h-5/6 border-2">
                        <ul className="p-2 sm:p-4">{
                            searchTag ?
                                search.map((linkmons:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkmons._id}`} className="flex justify-between">
                                        <a href={linkmons.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                            <p>{linkmons.title}</p>
                                        </li></a>
                                        <DeleteUang {...linkmons}/>
                                    </div>
                                ))
                            :
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
