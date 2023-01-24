import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify'

const kioskSchema: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.addSchema({
        $id: 'kiosk',
        title: 'Kiosk Schema',
        type: 'object',
        properties: {
            _id: {
                type: 'string'
            },
            serialKey: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            isKioskClosed: {
                type: 'boolean'
            },
            storeOpensAt: {
                type: 'string',
                format: 'time',
                // example: '12:00:00'
            },
            storeClosesAt: {
                type: 'string',
                format: 'time',
                // example: '01:00:00'
            }
        },
        additionalProperties: false,
        required: [
            'description',
            'isKioskClosed',
            'storeOpensAt',
            'storeClosesAt'
        ]
    })
}

export default fp(
    kioskSchema,
    {
        name: 'kioskSchema'
    }
);
