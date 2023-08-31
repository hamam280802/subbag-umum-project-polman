'use client';

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from '@headlessui/react'

type ItemPerencanaan = {
    _id: number;
    title: string;
    link: string;
}

export default function DeleteRencana(linkrencana: ItemPerencanaan) {
    const [modal, setModal] = useState(false)
    const [btn, setBtn] = useState(false)
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        setIsMutating(false);
        setModal(false);
        const res = await fetch(`http://localhost:3000/api/mans?id=${linkrencana?._id}`,{
            method: "DELETE",
        });
        if(res.ok){
            router.refresh();
        }
    }

  return (
    <div>
        <button type="button" onClick={()=>setBtn(true)} className={btn ? 'hidden' : 'mt-3'}>
            <svg width="20px" height="20px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </button>
        <div onMouseOut={()=>setBtn(false)} className={btn ? '' : 'hidden'}>
            <button type="button" onClick={()=>setModal(true)} className="py-2 mb-2 px-4 bg-red-500 rounded-lg font-semibold text-xl border shadow-lg hover:text-white hover:bg-red-700">X</button>
        </div>
        <Transition.Root show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setModal}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Hapus link
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Anda ingin menghapus link "<a href={linkrencana.link}>{linkrencana.title}</a>"?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {!isMutating ? (
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>handleDelete()}>
                                    Hapus
                                </button>
                            ) : (
                                <button type="button" disabled className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>handleDelete()}>
                                    Memproses...
                                </button>
                            )}
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>setModal(false)}>
                                Batal
                            </button>
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
