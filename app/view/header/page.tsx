'use client';

import Image from "next/image";

export default function Header({title}:any) {
  
  return (
    <div>
        <header className="bg-blue-500 px-5 pt-10 pb-5 space-y-5 shadow-xl">
            <h1 className="text-5xl text-white font-bold">EFEKSI</h1>
            <div className="py-1 px-8 border rounded-lg border-gray-200 shadow-xl flex justify-between bg-white">
                <p className="font-semibold text-lg p-2 flex">Bidang Fungsi<Image width={14} height={10} className="m-[0.4rem]" src="/icons/down-filled-triangular-arrow.png" alt=">"/></p>
                <ul className="space-x-8 flex font-semibold text-lg">
                    <a href="/view/kepegawaian" className={title == "kepegawaian" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Kepegawaian</li></a>
                    <a href="/view/keuangan" className={title == "keuangan" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' :'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Keuangan</li></a>
                    <a href="/view/perencanaan-anggaran" className={title == "perencanaan-anggaran" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Perencanaan Anggaran</li></a>
                    <a href="/view/umum" className={title == "umum" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Umum</li></a>
                </ul>
            </div>
        </header>
    </div>
  )
}
