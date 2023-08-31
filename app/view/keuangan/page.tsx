import Header from "../header/page";
import AddUang from "./adduang";
import DeleteUang from "./deleteuang";
import Image from "next/image";

async function getMoney() {
    try {
        const res = await fetch('http://localhost:3000/api/mons', {cache: "no-store"});

        if (!res.ok) {
            return new Error("Gagal terhubung ke database")
        }

        return res.json();
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
}

export default async function Keuangan() {
    const {mons} = await getMoney();

    return (
        <div>
            <Header title="keuangan"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Keuangan</p>
                    <AddUang/>
                    <a href="/" className="fixed bottom-5 right-6 bg-blue-500 text-white py-2 px-6 rounded-md font-semibold text-lg transition ease-in-out hover:-translate-y-1 hover:scale-110"><Image src="../../icons/home.png/" alt="Beranda" className="h-8 w-8"/></a>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-[90%]">
                        <ul className="p-4">{
                            mons?.map((linkmons:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkmons.id}`} className="flex justify-between">
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