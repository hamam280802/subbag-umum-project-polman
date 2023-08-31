import Header from "../header/page";
import AddPegawai from "./addpegawai";
import DeletePegawai from "./deletepegawai";

async function getEmployee() {
    try {
        const res = await fetch('http://efeksi.vercel.app/api/emps', {cache: "no-store"});

        if (!res.ok) {
            return new Error("Gagal terhubung ke database")
        }

        return res.json();
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
}

export default async function Kepegawaian() {
    const {emps} = await getEmployee();

    return (
        <div>
            <Header title="kepegawaian"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Kepegawaian</p>
                    <AddPegawai/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-[90%]">
                        <ul className="p-4">{
                            emps?.map((linkemp:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkemp.id}`} className="flex justify-between">
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