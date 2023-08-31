'use client';

import { Fragment, useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from '@headlessui/react'

export default function AddManagement() {
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(false);
        setModal(false);
        try {
            const res = await fetch("http://efeksi.vercel.app/api/mans", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({title, link}),
            });

            if(!res.ok){
                throw new Error("Gagal membuat list");
            }
        } catch (error) {
            
        }
        router.refresh();
        setTitle("");
        setLink("");
    };

  return (
    <div>
        <button type="button" onClick={()=>setModal(true)} className="w-8 h-8 rounded-full bg-blue-500 font-semibold text-lg shadow-md hover:text-white hover:bg-blue-700">+</button>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="text-center">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Tambah link
                                        </Dialog.Title>
                                        <form className="space-y-4" onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <input type="text" placeholder="Isi judul link" value={title} onChange={(e) => setTitle(e.target.value)} name="LinkTitle" id="linktitle" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 p-2"/>
                                            </div>
                                            <div>
                                                <textarea placeholder="Isi alamat URl" value={link} onChange={(e) => setLink(e.target.value)} id="linkname" name="LinkName" rows={10} className="resize-none mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 p-2"></textarea>
                                            </div>
                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                {!isMutating ? (
                                                    <button disabled={title === '' || link === ''} type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2 disabled:opacity-25">Input</button>
                                                ) : (
                                                    <button disabled className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2 disabled:opacity-25">Memuat...</button>
                                                )}
                                                <button type="button" onClick={()=>{setModal(false); setTitle(""); setLink("");}} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0">Batal</button>
                                            </div>
                                        </form>
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
