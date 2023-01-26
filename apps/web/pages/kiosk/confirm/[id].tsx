import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Kiosk() {
    const { query, back } = useRouter();
    // const [kioskId, setKioskId] = useState<string>('');
    // // Wait and get Kiosk by Id
    // useEffect(() => {
    //     if (query.id !== undefined) {
    //         setKioskId(query.id)
    //     }
    // }, [query])

    async function hadleRemoveKiosk() {

        try {
            await axios.delete(`http://localhost:3030/kiosks/${query.id}`);
            alert('Kiosk deleted!')
            back()
            // NextResponse.redirect('http://localhost:3000')
        } catch (error) {
            alert('Erro to delete Kiosk.')
            console.log(error)
        }
    }

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <h1 className='text-6xl font-black mt-20 '>Kiosk Management</h1>
            <div className='p-7 bg-zinc-100 max-w-[720px] mx-auto flex flex-col items-center my-20 relative overflow-x-auto shadow-md sm:rounded-lg'>
                <h2 className="text-slate-900 dark:text-slate-500 mt-5 text-4xl font-medium tracking-tight">Warning!</h2>
                <br></br>
                <p className="text-slate-700 dark:text-slate-500 mt-2 text-lg">
                    After confirm kiosk will be deleted forever
                </p>
                <br></br>
                <div className="grid gap-2 grid-cols-2">
                    <button
                        className="text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2 "
                        type="button"
                        onClick={hadleRemoveKiosk}>
                        Confirm
                    </button>
                    <button
                        className="text-white bg-zinc-600 hover:bg-zinc-700 focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-7 py-2"
                        type="button"
                        onClick={back}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}