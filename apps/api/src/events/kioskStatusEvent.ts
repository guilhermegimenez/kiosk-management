import fp from 'fastify-plugin'
import { IKiosk } from '../interfaces/kioskInterface';
import { ObjectId } from '@fastify/mongodb';

// ---------------Summary:
// This plugin event update kiosk status isKioskClosed
// with true or false by the values defined in the storeOpensAt and storeClosesAt

// Schedule to execute every 60 seconds
// ----------------------------------------------------

// Environments Variables
const KIOSKS_COLLECITON_NAME = process.env.KIOSK_COLLECTION_NAME || 'kiosks';

export interface KioskStatusEventOptions {
    // Specify Support plugin options here
}

// This plugin does not need to be read out of scope
export default fp<KioskStatusEventOptions>(async (fastify, opts) => {
    fastify.decorate('updateKioskStatusEvent',
        // Set Interval to execute event every 60 seconds    
        setInterval(async () => {
            // Find all kiosks to verify kiosk status
            const collection = fastify.mongo.db?.collection(KIOSKS_COLLECITON_NAME);
            const listOfKiosks = await collection?.find<IKiosk>({})?.toArray();

            // Initialize data time, hour and minutes to use in the rule
            const currentDateTime = new Date();
            const currentHour = currentDateTime.getHours();
            const currentMinutes = currentDateTime.getMinutes();

            // Need to verifify 'listOfKiosks' value before execute the rule in a Promise 
            if (listOfKiosks !== undefined) {

                // Execute a Promise.all mapping async all the kioks and check close Status
                // Using Promise you have more performance to update all kiosks status
                // Do not change to a simple loop like _for_, it will be slow 
                Promise.all(listOfKiosks?.map(async (kiosk) => {

                    const [storeOpenHour, storeOpenMinutes] = kiosk.storeOpensAt
                        .split(':')
                        .map(item => Number(item));

                    const [storeCloseHour, storeCloseMinutes] = kiosk.storeClosesAt
                        .split(':')
                        .map(item => Number(item));


                    // --------------------------------------------------------------------------------------------------------------------------------
                    // Conditions to update kiosk status
                    // --------------------------------------------------------------------------------------------------------------------------------

                    // First condition - Verify if the Kiosk have to be open by next rule:
                    // ----------------------------------------------------------------------
                    // If storeOpens it is equal the currentHour and currents minutes bigger than or equal to storeOpenMinutes
                    // It means that the Kiosk is open, so the event execute a update to isKioskClosed status to false

                    // Second condition - Verify if the Kiosk have to be closed by next rule:
                    // ----------------------------------------------------------------------
                    // If currentHour it is equal to storeCloseHour and currents minutes bigger than or equal to storeCloseMinutes
                    // It means that the Kiosk is close, so the event execute a update to isKioskClosed status to false
                    // --------------------------------------------------------------------------------------------------------------------------------

                    if (currentHour === storeOpenHour && currentMinutes >= storeOpenMinutes && kiosk.isKioskClosed === true) {
                        await collection?.findOneAndUpdate({
                            _id: new ObjectId(kiosk._id)
                        }, {
                            $set: {
                                isKioskClosed: false
                            }
                        })
                    } else if (currentHour === storeCloseHour && currentMinutes >= storeCloseMinutes && kiosk.isKioskClosed === false) {
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


        }, 60000))
})