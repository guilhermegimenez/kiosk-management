import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify'

const commonSchema: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.addSchema({
        $id: 'badrequest',
        description: 'Bad Request',
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    })

    fastify.addSchema({
        $id: 'notfound',
        description: 'Kiosk not found',
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    })
}

export default fp(
    commonSchema,
    {
        name: 'commonSchema'
    }
);
