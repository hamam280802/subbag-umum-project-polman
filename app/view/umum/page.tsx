import Header from "../header/page";
import AddUmum from "./addumum";
import DeleteUMum from "./deleteumum";

async function getPublic() {
    try {
        const res = await fetch('http://efeksi.vercel.app/api/pubs', {cache: "no-store"});

        if (!res.ok) {
            return new Error("Gagal terhubung ke database")
        }

        return res.json();
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
}

export default async function Umum() {
    const {pubs} = await getPublic();

    return (
        <div>
            <Header title="umum"/>

            <main className="flex absolute w-full h-full">
                <div className="p-5 w-full">
                <div className="space-x-2 flex items-center mb-5">
                    <p className="text-2xl font-semibold">Fungsi Umum</p>
                    <AddUmum/>
                </div>
                    <div className="overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-[90%]">
                        <ul className="p-4">{
                            pubs?.map((linkpubs:{title: string, link:string, _id:number, id:number}) => (
                                <div key={`${linkpubs.id}`} className="flex justify-between">
                                    <a href={linkpubs.link} className="w-full mr-2 mb-2"><li className="p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg hover:bg-gray-100">
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