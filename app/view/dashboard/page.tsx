import Header from "../header/page";

async function getCalendar() {
    try {
        const res = await fetch('http://localhost:3000/api/cals', {cache: "no-store"});

        if (!res.ok) {
            return new Error("Gagal terhubung ke database")
        }

        return res.json();
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
}

export default async function Dashboard() {
    const {cals} = await getCalendar();
  return (
    <div>
        <Header/>
        <main>
            <div className="mx-5 mt-10">
                <a className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-md border font-semibold hover:cursor-pointer" href="/view/calendar">Buat jadwal</a>
            </div>
            <div className="mx-5 my-5 overflow-y-auto bg-gray-100 rounded-xl shadow-inner h-[40%]">
                <ul className="p-4 space-y-3">{
                    cals?.map((calevent: {title: string, start: Date, end: Date}) => (
                        <li className="flex space-x-4 p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg">
                            <p>{calevent.title}:</p><p>{formatDateTime(calevent.start)} - {formatDateTime(calevent.end)}</p>
                        </li>
                    ))
                }</ul>
            </div>
            <div className="flex justify-between py-10 px-10 border-t-2 shadow-inner">
                <a href="/view/kepegawaian" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                    <img src="../icons/EmployeeIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                    <p className="text-2xl text-center font-semibold">Fungsi</p>
                    <p className="text-2xl text-center font-semibold">Kepegawaian</p>
                </div></a>
                <a href="/view/keuangan" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                    <img src="../icons/MoneyIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                    <p className="text-2xl text-center font-semibold">Fungsi</p>
                    <p className="text-2xl text-center font-semibold">Keuangan</p>
                </div></a>
                <a href="/view/perencanaan-anggaran" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                    <img src="../icons/PlanIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                    <p className="text-2xl text-center font-semibold">Fungsi</p>
                    <p className="text-2xl text-center font-semibold">Perencanaan</p>
                    <p className="text-2xl text-center font-semibold">Anggaran</p>
                </div></a>
                <a href="/view/umum" className="hover:bg-gray-100 hover:shadow-lg rounded-lg p-3 pb-10 transition ease-in-out hover:-translate-y-1 hover:scale-110"><div>
                    <img src="../icons/PublicIcon.svg" className="h-60 w-60" alt="Kepegawaian"/>
                    <p className="text-2xl text-center font-semibold">Fungsi</p>
                    <p className="text-2xl text-center font-semibold">Umum</p>
                </div></a>
            </div>
        </main>
    </div>
  )
}

function formatDateTime(date: Date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } as const;
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}