import Header from "../header/page";
import ImageEl from "./imageEl";

async function getCalendar() {
    try {
        const res = await fetch('http://efeksibps.netlify.app/api/cals', {cache: "no-store"});

        if (!res.ok) {
            throw new Error("Gagal terhubung ke database")
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error memuat database: ", error);
        return null;
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
                    cals?.map((calevent: {title: string, start: Date, end: Date, id: Number}) => (
                        <li key={`${calevent.id}`} className="flex space-x-4 p-2 w-full border shadow-lg bg-white font-semibold text-xl rounded-lg">
                            <p>{calevent.title}:</p><p>{formatDateTime(calevent.start)} - {formatDateTime(calevent.end)}</p>
                        </li>
                    ))
                }</ul>
            </div>
            <ImageEl/>
        </main>
    </div>
  )
}

function formatDateTime(date: Date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } as const;
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}