import { ObjectId } from "@fastify/mongodb";

export interface IKiosk {
    _id?: ObjectId;
    serialKey?: string
    description: string
    isKioskClosed: boolean
    storeOpensAt: string
    storeClosesAt: string
}