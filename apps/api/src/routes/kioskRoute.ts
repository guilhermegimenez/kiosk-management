import { FastifyPluginAsync } from 'fastify'
import { IKiosk } from '../interfaces/kioskInterface';
interface IParams {
    id: string;
}

const kioskRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.get('/kiosks',
        {
            schema: {
                description: 'Get a list of Kiosks',
                tags: ['kiosk'],
                response: {
                    200: {
                        description: 'Success',
                        type: 'array',
                        items: {
                            $ref: 'kiosk#'
                        }
                    },
                    404: {
                        $ref: 'notfound#'
                    }
                }
            }
        },
        async function (request, reply) {
            return await fastify.kioskService.listAll()
        }
    )

    fastify.get<{ Params: IParams }>('/kiosks/:id',
        {
            schema: {
                description: 'Get Kiosk by ID',
                tags: ['kiosk'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID of kiosk to return'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Success',
                        $ref: 'kiosk#'
                    },
                    400: {
                        $ref: 'badrequest#'
                    },
                    404: {
                        $ref: 'notfound#'
                    }
                }
            }
        },
        async function (request, reply) {
            const result = await fastify.kioskService.getById(request.params.id);
            if (result === null) {
                reply.notFound('Kiosk not found');
            } else {
                return result;
            }
        }
    )

    fastify.post<{ Body: IKiosk }>('/kiosks',
        {
            schema: {
                description: 'Create a new Kiosk',
                tags: ['kiosk'],
                body: {
                    $id: 'kiosk',
                    title: 'Kiosk Schema',
                    type: 'object',
                    properties: {
                        description: {
                            type: 'string'
                        },
                        isKioskClosed: {
                            type: 'boolean'
                        },
                        storeOpensAt: {
                            type: 'string',
                            format: 'time'
                        },
                        storeClosesAt: {
                            type: 'string',
                            format: 'time'
                        }
                    },
                    additionalProperties: false,
                    required: [
                        'description',
                        'isKioskClosed',
                        'storeOpensAt',
                        'storeClosesAt'
                    ]
                },
                response: {
                    201: {
                        description: 'Success',
                        $ref: 'kiosk#'
                    },
                    400: {
                        $ref: 'badrequest#'
                    }
                }
            }
        },
        async function (request, reply) {
            return await fastify.kioskService.create(request.body)
        }
    )

    fastify.put<{ Body: IKiosk, Params: IParams }>('/kiosks/:id',
        {
            schema: {
                description: 'Update a Kiosk resource',
                tags: ['kiosk'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID of kiosk to update'
                        }
                    }
                },
                body: {
                    $id: 'kiosk',
                    title: 'Kiosk Schema',
                    type: 'object',
                    properties: {
                        description: {
                            type: 'string'
                        },
                        isKioskClosed: {
                            type: 'string'
                        },
                        storeOpensAt: {
                            type: 'string',
                            format: 'time'
                        },
                        storeClosesAt: {
                            type: 'string',
                            format: 'time'
                        }
                    },
                    additionalProperties: false,
                    required: [
                        'description',
                        'isKioskClosed',
                        'storeOpensAt',
                        'storeClosesAt'
                    ]
                },
                response: {
                    200: {
                        description: 'Kiosk successfully updated',
                        type: 'string'
                    },
                    400: {
                        $ref: 'badrequest#'
                    },
                    404: {
                        $ref: 'notfound#'
                    }
                }
            }
        },
        async function (request, reply) {
            const result = await fastify.kioskService.update(request.params.id, request.body)
            if (result === null) {
                reply.notFound('Kiosk not found');
            } else {
                return result;
            }
        }
    )

    fastify.delete<{ Params: IParams }>('/kiosks/:id',
        {
            schema: {
                description: 'Delete Kiosk by ID',
                tags: ['kiosk'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID of kiosk to update'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Kiosk successfully deleted',
                        type: 'string'
                    },
                    400: {
                        $ref: 'badrequest#'
                    },
                    404: {
                        $ref: 'notfound#'
                    }

                }
            }
        },
        async function (request, reply) {
            const result = await fastify.kioskService.remove(request.params.id)
            if (result === null) {
                reply.notFound('Kiosk not found');
            } else {
                return result;
            }
        }
    )
}

export default kioskRoute;