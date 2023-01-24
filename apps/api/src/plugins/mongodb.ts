import { FastifyMongodbOptions, fastifyMongodb } from '@fastify/mongodb'
import fp from 'fastify-plugin'

export default fp<FastifyMongodbOptions>(async (fastify, opt) => {
    fastify.register(fastifyMongodb, {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,
        url: 'mongodb://localhost:27017',
        database: 'fingermark-test'
    })
})
