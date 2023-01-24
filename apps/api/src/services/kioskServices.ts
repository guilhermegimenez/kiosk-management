import { ObjectId } from '@fastify/mongodb';
import fp from 'fastify-plugin'
import { IKiosk } from '../interfaces/kioskInterface';
// import { Kiosk } from '../types/kioskType';

export interface IKioskServiceOptions {
    // Specify Support plugin options here
}

export interface IKioskService {
    getById: (id: string) => Promise<IKiosk | null>
    listAll: () => Promise<IKiosk[] | []>
    create: (kiosk: IKiosk) => Promise<IKiosk | null>
    update: (id: string, kiosk: IKiosk) => Promise<string>
    remove: (id: string) => Promise<string | null>
}


// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<IKioskServiceOptions>(async (fastify, opts) => {

    const kioskService: IKioskService = {
        listAll: async (): Promise<IKiosk[] | []> => {
            const colletion = fastify.mongo.db?.collection('kiosks');
            const result = await colletion?.find<IKiosk>({});
            const list = await result?.toArray();
            return list !== undefined ? list : [];
        },
        getById: async (id): Promise<IKiosk | null> => {
            const colletion = fastify.mongo.db?.collection('kiosks');
            const result = await colletion?.findOne<IKiosk | null>({ _id: new ObjectId(id) });
            return result !== undefined ? result : null;
        },
        create: async (kiosk): Promise<IKiosk | null> => {
            try {
                const colletion = fastify.mongo.db?.collection('kiosks');
                const result = await colletion?.insertOne(kiosk);

                const newKiosk = await colletion?.findOne<IKiosk>({
                    _id: result?.insertedId
                })

                if (newKiosk !== undefined)
                    return newKiosk;
                else
                    throw Error('Error to recovery new kiosk document')
            } catch (error) {
                throw error;
            }
        },
        update: async (id, kiosk): Promise<string> => {
            try {
                const colletion = fastify.mongo.db?.collection('kiosks');
                const result = await colletion?.findOneAndUpdate({
                    _id: new ObjectId(id)
                }, { $set: { ...kiosk } })

                if (result?.ok)
                    return `Kiosk ${id} successfully updated`;
                else
                    throw Error('Error to update kiosk')
            } catch (error) {
                throw error;
            }
        },
        remove: async (id): Promise<string> => {
            try {
                const colletion = fastify.mongo.db?.collection('kiosks');
                const result = await colletion?.findOneAndDelete({
                    _id: new ObjectId(id)
                })

                if (result?.ok)
                    return `Kiosk ${id} successfully deleted`;
                else
                    throw Error('Error to update kiosk')
            } catch (error) {
                throw error;
            }
        }

    }


    fastify.decorate('kioskService', kioskService)
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        kioskService: IKioskService;
    }
}
