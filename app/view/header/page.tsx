'use client';

import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from "react";

export default function Header({title}:any) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
        <header className="bg-blue-500 px-5 pt-10 pb-5 space-y-5 shadow-xl">
            <h1 className="text-5xl text-white font-bold text-center sm:text-left">EFEKSI</h1>
            <div className="hidden py-1 px-8 border rounded-lg border-gray-200 shadow-xl sm:flex justify-between bg-white">
                <p className="font-semibold text-lg p-2 flex">Bidang Fungsi<Image width={14} height={10} className="m-[0.4rem]" src="/icons/down-filled-triangular-arrow.png" alt=">"/></p>
                <ul className="space-x-8 flex font-semibold text-lg">
                    <a href="/view/kepegawaian" className={title == "kepegawaian" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Kepegawaian</li></a>
                    <a href="/view/keuangan" className={title == "keuangan" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' :'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Keuangan</li></a>
                    <a href="/view/perencanaan-anggaran" className={title == "perencanaan-anggaran" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Perencanaan Anggaran</li></a>
                    <a href="/view/umum" className={title == "umum" ? 'text-white bg-blue-500 rounded-full cursor-default p-2' : 'hover:text-white hover:bg-blue-500 hover:rounded-full hover:cursor-pointer p-2'}><li>Umum</li></a>
                </ul>
            </div>
            <div onClick={()=>setShowModal(true)} className="sm:hidden py-1 px-3 border rounded-lg border-gray-200 shadow-xl flex justify-center bg-white cursor-pointer">
              <p className="font-semibold text-xl flex">Bidang Fungsi</p>
            </div>
        </header>
        {title === "kepegawaian" || title === "keuangan" || title === "perencanaan-anggaran" || title === "umum" ? (
          <a href="/" className="fixed bottom-5 right-6 bg-blue-500 text-white py-2 px-6 rounded-md font-semibold text-lg transition ease-in-out hover:-translate-y-1 hover:scale-110 z-10"><Image width={30} height={30} src="/icons/home.png" alt="Beranda"/></a>
        ) : (
          <></>
        )}
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="text-center">
                        <ul className="space-y-4 font-semibold text-lg m-2 py-2">
                          <a href="/view/kepegawaian" className='flex hover:cursor-pointer hover:bg-blue-400 hover:text-white p-2 shadow-md bg-gray-100 rounded-md focus:outline-none'><li>Kepegawaian</li></a>
                          <a href="/view/keuangan" className='flex hover:cursor-pointer hover:bg-blue-400 hover:text-white p-2 shadow-md bg-gray-100 rounded-md focus:outline-none'><li>Keuangan</li></a>
                          <a href="/view/perencanaan-anggaran" className='flex hover:cursor-pointer hover:bg-blue-400 hover:text-white p-2 shadow-md bg-gray-100 rounded-md focus:outline-none'><li>Perencanaan Anggaran</li></a>
                          <a href="/view/umum" className='flex hover:cursor-pointer hover:bg-blue-400 hover:text-white p-2 shadow-md bg-gray-100 rounded-md focus:outline-none'><li>Umum</li></a>
                      </ul>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
    </div>
  )
}
