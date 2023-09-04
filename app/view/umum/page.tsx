'use client'

import Header from "../header/page";
import AddUmum from "./addumum";
import DeleteUMum from "./deleteumum";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Umum() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTag, setSearchTag] = useState(false);

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
            <Header title="umum"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="mb-5 sm:flex justify-between space-y-4 sm:space-y-0">
                    <div className="space-x-2 flex items-center">
                        <p className="sm:text-2xl text-xl font-semibold">Fungsi Umum</p>
                        <AddUmum/>
                    </div>
                    <input type="text" onChange={searchLink} placeholder="Cari link disini" className="p-2 border shadow-inner bg-gray-50 rounded-lg w-full sm:w-96 focus:outline-none"/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner sm:h-5/6 border-2">
                        <ul className="p-2 sm:p-4">{
                            searchTag ?
                                search.map((linkpubs:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkpubs._id}`} className="flex justify-between">
                                        <a href={linkpubs.link} target="_blank" className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                            <p>{linkpubs.title}</p>
                                        </li></a>
                                        <DeleteUMum {...linkpubs}/>
                                    </div>
                                ))
                            :
                                data.map((linkpubs:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkpubs._id}`} className="flex justify-between">
                                        <a href={linkpubs.link} target="_blank" className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
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
