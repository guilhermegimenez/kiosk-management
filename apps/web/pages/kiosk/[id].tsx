import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
interface IKiosk {
    _id?: string;
    serialKey?: string
    description: string
    isKioskClosed: boolean
    storeOpensAt: string
    storeClosesAt: string
}

export default function Kiosk() {
    const { query } = useRouter();
    const [kiosk, setKiosk] = useState<IKiosk>({
        description: '',
        isKioskClosed: true,
        storeClosesAt: '00:00',
        storeOpensAt: '00:00'
    });

    const [hoursToOpen, setHoursToOpen] = useState<string[]>([]);
    const [minutesToOpen, setMinutesToOpen] = useState<string[]>([]);
    const [hoursToClose, setHoursToClose] = useState<string[]>([]);
    const [minutesToClose, setMinutesToClose] = useState<string[]>([]);

    useEffect(() => {
        let hours = [];
        let minutes = [];
        for (let i = 0; i < 24; i++) {
            hours.push(i < 10 ? `0${String(i)} h` : `${String(i)} h`);
        }
        for (let i = 0; i < 60; i++) {
            minutes.push(i < 10 ? `0${String(i)} min` : `${String(i)} min`);
        }
        setHoursToOpen(hours)
        setMinutesToOpen(minutes)
        setHoursToClose(hours)
        setMinutesToClose(minutes)
    }, [])

    // Wait and get Kiosk by Id
    useEffect(() => {
        if (query.id !== undefined) {
            const url = `http://localhost:3030/kiosks/${query.id}`;
            axios.get(url).then(response => {
                // console.log(response.data);
                setKiosk(response.data)
            })
        }

    }, [query])

    function getTimeToOpen() {
        const hour = kiosk.storeOpensAt.split(':').map(x => {
            return Number(x)
        })[0]
        console.log(hour)
        return hour
    }

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <h1 className='text-6xl font-black mt-20 '>Kiosk Management</h1>
            <div className='p-7 max-w-[720px] mx-auto flex flex-col items-center my-20 relative overflow-x-auto shadow-md sm:rounded-lg'>
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-id">
                                Id
                            </label>
                            <input disabled value={kiosk?._id} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" type="text" placeholder="Jane" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                                Description
                            </label>
                            <input value={kiosk?.description} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" type="text" placeholder="Description" />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Opens
                            </label>
                            <div className="grid gap-1 mb-6 md:grid-cols-2">
                                <div>
                                    <select value={getTimeToOpen()} id="countries" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-300 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Hour</option>
                                        {
                                            hoursToOpen.map((hour, i) => {
                                                return (
                                                    <option value={hour}>{hour}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-300 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Minutes</option>
                                        {
                                            minutesToOpen.map((minute, i) => {
                                                return (
                                                    <option value={i}>{minute}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Closes
                            </label>
                            <div className="grid gap-1 mb-6 md:grid-cols-2">
                                <div>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-300 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Hour</option>
                                        {
                                            hoursToClose.map((hour, i) => {
                                                return (
                                                    <option value={i}>{hour}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <select value={2} id="countries" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-300 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Minutes</option>
                                        {
                                            minutesToClose.map((minute, i) => {
                                                return (
                                                    <option value={i}>{minute}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


// export const getServerSideProps = async () => {
//     const result = await axios.get('http://localhost:3030/kiosks/')
//     return {
//       props: { list: result.data }
//     }
//   }
