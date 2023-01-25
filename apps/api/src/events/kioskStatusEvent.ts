import fp from 'fastify-plugin'
import { IKiosk } from '../interfaces/kioskInterface';
import { ObjectId } from '@fastify/mongodb';

// This plugin event update kiosk status isKioskClosed
// with true or false by the values defined in the storeOpensAt and storeClosesAt

// Schedule to execute every 60 seconds

// Environments Variables
const KIOSKS_COLLECITON_NAME = process.env.KIOSK_COLLECTION_NAME || 'kiosks';

export interface KioskStatusEventOptions {
    // Specify Support plugin options here
    seconds: number;
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<KioskStatusEventOptions>(async (fastify, opts) => {
    fastify.decorate('updateKioskStatusEvent',
        setInterval(async () => {

            const collection = fastify.mongo.db?.collection(KIOSKS_COLLECITON_NAME);
            const listOfKiosks = await collection?.find<IKiosk>({})?.toArray();

            const currentDateTime = new Date();
            const currentHour = currentDateTime.getHours();
            const currentMinute = currentDateTime.getMinutes();

            if (listOfKiosks !== undefined) {
                Promise.all(listOfKiosks?.map(async (kiosk) => {

                    const [storeOpenHour, storeOpenMinutes] = kiosk.storeOpensAt
                        .split(':')
                        .map(result => Number(result));

                    const [storeCloseHour, storeCloseMinutes] = kiosk.storeClosesAt
                        .split(':')
                        .map(result => Number(result));

                    if (currentHour === storeOpenHour && currentMinute >= storeOpenMinutes && kiosk.isKioskClosed === true) {
                        await collection?.findOneAndUpdate({
                            _id: new ObjectId(kiosk._id)
                        }, {
                            $set: {
                                isKioskClosed: false
                            }
                        })
                    } else if (currentHour === storeCloseHour && currentMinute >= storeCloseMinutes && kiosk.isKioskClosed === false) {
                        await collection?.findOneAndUpdate({
                            _id: new ObjectId(kiosk._id)
                        }, {
                            $set: {
                                isKioskClosed: true
                            }
                        })
                    }
                }))
            }


        }, 1500))
})

// declare module 'fastify' {
//     export interface FastifyInstance {
//         updateKioskStatusEvent: void
//     }
// }
