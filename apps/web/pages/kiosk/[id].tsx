import { useRouter } from "next/router";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "ui";
import { NextResponse } from 'next/server'
interface IKiosk {
    _id?: string;
    serialKey?: string
    description: string
    isKioskClosed: boolean
    storeOpensAt: string
    storeClosesAt: string
}

export default function Kiosk() {
    const { query, back } = useRouter();

    const [kiosk, setKiosk] = useState<IKiosk>({
        description: '',
        isKioskClosed: true,
        storeClosesAt: '00:00',
        storeOpensAt: '00:00'
    });

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

    async function hadleUpdateKiosk(event: FormEvent) {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:3030/kiosks/${kiosk._id}`, {
                description: kiosk.description,
                storeOpensAt: kiosk.storeOpensAt,
                storeClosesAt: kiosk.storeClosesAt,
                isKioskClosed: kiosk.isKioskClosed
            });
            alert('Kiosk updated!')
            back()
            // NextResponse.redirect('http://localhost:3000')
        } catch (error) {
            alert('Erro to update Kiosk.')
            console.log(error)
        }
    }

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <h1 className='text-6xl font-black mt-20 '>Kiosk Management</h1>
            <div className='p-7 max-w-[720px] mx-auto flex flex-col items-center my-20 relative overflow-x-auto shadow-md sm:rounded-lg'>
                <form onSubmit={hadleUpdateKiosk} className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Id
                            </label>
                            <input disabled
                                className="appearance-none cursor-not-allowed block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight "
                                id="_id"
                                name="_id"
                                type="text"
                                value={kiosk._id} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <input
                                className="appearance-none block w-full dark:bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:text-zinc-700 focus:border-gray-500"
                                type="text"
                                placeholder="Description"
                                id="description"
                                name="description"
                                value={kiosk.description}
                                onChange={(e) => setKiosk({ ...kiosk, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 flex-1">
                        <div className='grid grid-cols-3 items-center gap-2'>
                            <div className="">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="storeOpensAt">
                                    Open
                                </label>
                                <div className="grid gap-1 mb-6 md:grid-cols-1">
                                    <Input name='storeOpensAt' id='storeOpensAt' type='time'
                                        value={kiosk.storeOpensAt.substring(0, 5)}
                                        onChange={(e) => setKiosk({ ...kiosk, storeOpensAt: e.target.value.concat(':00') })}></Input>
                                </div>
                            </div>
                            <div className="">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="storeClosesAt">
                                    Close
                                </label>
                                <div className="grid gap-1 mb-6 md:grid-cols-1">
                                    <Input name='storeClosesAt' id='storeClosesAt' type='time'
                                        value={kiosk.storeClosesAt.substring(0, 5)}
                                        onChange={(e) => setKiosk({ ...kiosk, storeClosesAt: e.target.value.concat(':00') })}></Input>
                                </div>
                            </div>
                            <div className="ml-3">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}