'use client';

import React from 'react'
import Image from 'next/image'

export default function ImageEl() {
  return (
    <div>
        <div className="flex justify-between py-10 px-10 border-t-2 shadow-inner">
            <a href="/view/kepegawaian" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                <Image width={60} height={60} src="../icons/EmployeeIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                <p className="text-2xl text-center font-semibold">Fungsi</p>
                <p className="text-2xl text-center font-semibold">Kepegawaian</p>
            </div></a>
            <a href="/view/keuangan" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                <Image width={60} height={60} src="../icons/MoneyIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                <p className="text-2xl text-center font-semibold">Fungsi</p>
                <p className="text-2xl text-center font-semibold">Keuangan</p>
            </div></a>
            <a href="/view/perencanaan-anggaran" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                <Image width={60} height={60} src="../icons/PlanIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                <p className="text-2xl text-center font-semibold">Fungsi</p>
                <p className="text-2xl text-center font-semibold">Perencanaan</p>
            </div></a>
            <a href="/view/umum" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                <Image width={60} height={60} src="../icons/PublicIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                <p className="text-2xl text-center font-semibold">Fungsi</p>
                <p className="text-2xl text-center font-semibold">Umum</p>
            </div></a>
        </div>
    </div>
  )
}
