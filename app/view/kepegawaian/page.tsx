"use client"

import Header from "../header/page";
import AddPegawai from "./addpegawai";
import DeletePegawai from "./deletepegawai";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Kepegawaian() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTag, setSearchTag] = useState(false);

    useEffect(()=>{
        async function getEmployee() {
            try {
                const res = await axios.get('/api/emps', { headers: { 'Cache-Control': 'no-store' } });
                const fullData = res.data;
                if (res.status !== 200) {
                    return new Error("Gagal terhubung ke database")
                }
                setData(fullData.emps)
            } catch (error) {
                console.log("Error memuat database: ", error);
            }
        }
        getEmployee();
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
            <Header title="kepegawaian"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="mb-5 flex justify-between">
                    <div className="space-x-2 flex items-center">
                        <p className="text-2xl font-semibold">Fungsi Kepegawaian</p>
                        <AddPegawai/>
                    </div>
                    <input type="text" onChange={searchLink} placeholder="Cari link disini" className="p-2 border shadow-inner bg-gray-50 rounded-lg w-96 focus:outline-none"/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-5/6 border-2">
                        <ul className="p-4">{
                            searchTag ?
                                search.map((linkemp:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkemp._id}`} className="flex justify-between">
                                        <a href={linkemp.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                            <p>{linkemp.title}</p>
                                        </li></a>
                                        <DeletePegawai {...linkemp}/>
                                    </div>
                                ))
                            :
                                data.map((linkemp:{title: string, link:string, _id:number, id:number}) => (
                                    <div key={`${linkemp._id}`} className="flex justify-between">
                                        <a href={linkemp.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                            <p>{linkemp.title}</p>
                                        </li></a>
                                        <DeletePegawai {...linkemp}/>
                                    </div>
                                ))
                        }</ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
