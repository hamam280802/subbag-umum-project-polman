import Header from "../header/page";
import AddRencana from "./addrencana";
import DeleteRencana from "./deleterencana";

async function getManagement() {
    try {
        const res = await fetch('http://localhost:3000/api/mans', {cache: "no-store"});

        if (!res.ok) {
            return new Error("Gagal terhubung ke database")
        }

        return res.json();
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
}

export default async function Perencanaan_Anggaran() {
    const {mans} = await getManagement();

    return (
        <div>
            <Header title="perencanaan-anggaran"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Perencanaan Anggaran</p>
                    <AddRencana/>
                    <a href="/" className="fixed bottom-5 right-6 bg-blue-500 text-white py-2 px-6 rounded-md font-semibold text-lg transition ease-in-out hover:-translate-y-1 hover:scale-110"><img src="../../icons/home.png/" alt="Beranda" className="h-8 w-8"/></a>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-[90%]">
                        <ul className="p-4">{
                            mans?.map((linkmans:{title: string, link:string, _id:number}) => (
                                <div className="flex justify-between">
                                    <a href={linkmans.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
                                        <p>{linkmans.title}</p>
                                    </li></a>
                                    <DeleteRencana {...linkmans}/>
                                </div>
                            ))
                        }</ul>
                    </div>
                </div>
            </main>
        </div>
    )
}