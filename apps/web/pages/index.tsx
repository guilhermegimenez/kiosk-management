// import { Button } from "ui";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "ui";

interface IKiosk {
  _id: string;
  serialKey?: string
  description: string
  isKioskClosed: boolean
  storeOpensAt: string
  storeClosesAt: string
}

interface IKioskList {
  list: IKiosk[]
}

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 1000
});

export default function KioskList(props: IKioskList) {


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <h1 className='text-6xl font-black mt-20 '>Kiosk Management</h1>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-500">
          <thead className="text-xl  text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Serial Key
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Opens
              </th>
              <th scope="col" className="px-6 py-3">
                Closes
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              props.list.map((kiosk) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-100 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-600">
                      {kiosk._id}
                    </th>
                    <td className="px-6 py-4">
                      {kiosk.description}
                    </td>
                    <td className="px-6 py-4">
                      {kiosk.storeOpensAt}
                    </td>
                    <td className="px-6 py-4">
                      {kiosk.storeClosesAt}
                    </td>
                    <td className="px-6 py-4">
                      {kiosk.isKioskClosed ? 'Closed' : 'Opened'}
                      {/* <Button onClick={() => handleAddProduct()}>{kiosk.isKioskClosed ? 'Closed' : 'Opened'}</Button> */}

                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/kiosk/${kiosk._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export const getServerSideProps = async () => {
  const result = await axios.get('http://localhost:3030/kiosks')
  return {
    props: { list: result.data }
  }
}
