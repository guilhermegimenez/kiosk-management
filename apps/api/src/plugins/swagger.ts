import fp from 'fastify-plugin'
import fastifySwagger, { FastifySwaggerOptions } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui'
export default fp<FastifySwaggerOptions>(async (fastify, opt) => {
    fastify.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Kiosk Management - API',
                description: 'This is a sample test abou Kiosk Management. The goal is delivery a CRUD for Kiosks.',
                version: '0.1.0',
                contact: {
                    email: 'gimenez.guilhermem@gmail.com'
                }
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'kiosk', description: 'Kiosk related end-points' }
            ],
            // definitions: {
            //     Kiosk: {
            //         title: "Kiosk Schema",
            //         type: "object",
            //         properties: {
            //             id: {
            //                 type: "string"
            //             },
            //             serialKey: {
            //                 type: "string"
            //             },
            //             description: {
            //                 type: "string"
            //             },
            //             isKioskClosed: {
            //                 type: "string"
            //             },
            //             storeOpensAt: {
            //                 type: "string",
            //                 format: "time",
            //                 example: "12:00:00"
            //             },
            //             storeClosesAt: {
            //                 type: "string",
            //                 format: "time",
            //                 example: "01:00:00"
            //             }
            //         },
            //         additionalProperties: false,
            //         required: [
            //             "description",
            //             "isKioskClosed",
            //             "storeOpensAt",
            //             "storeClosesAt"
            //         ]
            //     }
            // }
        }
    })

    fastify.register(swaggerUi, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        // staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })
})
