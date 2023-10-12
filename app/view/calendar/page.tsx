"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, SyntheticEvent, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';
import Image from 'next/image';


interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: number;
}

function formatDateTime(date: Date | string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } as const;
  return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}

export default function Calendar() {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [titleToDelete, setTitleToDelete] = useState('')
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: 0
  })

  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Date | string>(new Date());
  const [end, setEnd] = useState<Date | string | moment.Moment>(new Date());
  const [allDay, setAllDay] = useState(false);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    async function getCalendar() {
        try {
            const res = await axios.get('/api/cals', { headers: { 'Cache-Control': 'no-store' } });
            const fullData = res.data;
            if (res.status !== 200) {
                throw new Error("Gagal terhubung ke database")
            }
            setData(fullData.cals);
        } catch (error) {
            console.log("Error memuat database: ", error);
            return null
        }
    }
    getCalendar();
  }, [])

  function handleDateRangeSelect(arg: { start: Date, end: Date, allDay: boolean}) {
    setNewEvent({ ...newEvent, start: arg.start, end: arg.end, allDay: arg.allDay, id: new Date().getTime()})
    setShowModal(true)
    setStart(arg.start)
    setEnd(arg.end)
    setAllDay(arg.allDay)
    setId(new Date().getTime())
  }

  function handleDeleteModal(data: { event: { id: string, title: string } }) {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
    setTitleToDelete(data.event.title)
  }

  async function repeat(){
    data.map((eventcal:{id: number, _id:number})=>(
      eventcal.id === idToDelete ? handleDelete(eventcal._id) : ''
    ))
    setShowDeleteModal(false)
    setIdToDelete(null)
    location.reload();
  }

  async function handleDelete(id: number) {
    try {
      const res = await axios.delete(`/api/cals?id=${id}`, { headers: { 'Cache-Control': 'no-store' } })
      if (res.status !== 200){
        throw new Error('Gagal menghapus list')
      }
    } catch (error) {
      console.log("Error memuat database: ", error);
      return null
    }
  }

  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0
    })
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
    setTitle(e.target.value)
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
        const data = {title, start, end, allDay, id}
        const res = await axios.post("/api/cals", data, { headers: { 'Cache-Control': 'no-store' } });

        if(res.status !== 201){
            throw new Error("Gagal membuat list");
        }
    } catch (error) {
        console.log("Error memuat database: ", error);
        return null
    }
      setShowModal(false)
      setNewEvent({
        title: '',
        start: '',
        end: '',
        allDay: false,
        id: 0
      })
      location.reload();
    }

  return (
    <>
    <div className='md:hidden mt-64 text-xl text-gray-200 font-bold text-center'>Perbesar layar untuk melihat jadwal</div>
      <main className="hidden md:flex min-h-screen flex-col px-5 pt-10 pb-20">
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,dayGridMonth'
              }}
              events={data}
              initialView='timeGridWeek'
              nowIndicator={true}
              selectable={true}
              selectMirror={true}
              select={handleDateRangeSelect}
              eventClick={(data) => handleDeleteModal(data)}
              eventBackgroundColor='green'
            />
          </div>
        </div>
        <a href="/" className="fixed bottom-5 right-6 bg-green-500 text-white py-2 px-6 rounded-md font-semibold text-lg transition ease-in-out hover:-translate-y-1 hover:scale-110 z-10"><Image width={30} height={30} src="/icons/home.png" alt="Beranda"/></a>
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Hapus jadwal
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Anda ingin menghapus jadwal &quot;{titleToDelete}&quot;?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={repeat}>
                        Hapus
                      </button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Batal
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
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
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Tambah jadwal
                        </Dialog.Title>
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:outline-none
                            sm:text-sm sm:leading-6 p-2"
                              value={title} onChange={(e) => handleChange(e)} placeholder="Title" />
                          </div>
                          <div>
                            <input type="text" readOnly className=" mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:outline-none
                            sm:text-sm sm:leading-6 p-2"
                              value={formatDateTime(start)}/>
                          </div>
                          <div className={`justify-center space-y-2 mt-4 ${open === true ? 'mb-48' : ''}`}>
                            <label>Tentukan rentang waktu</label>
                            <Datetime onOpen={()=>setOpen(true)} closeOnSelect onClose={()=>setOpen(false)} className='border rounded-md p-2 w-full justify-between flex text-sm' value={end} onChange={(date)=>setEnd(date)}/>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2 disabled:opacity-25"
                              disabled={title === ''}
                            >
                              Buat
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}

                            >
                              Batal
                            </button>
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
      </main >
    </>
  )
}
