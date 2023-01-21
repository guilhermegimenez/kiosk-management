interface Kiosk {
    id?: string;
    serialKey?: string;
    description: string;
    isKioskClosed: boolean;
    storeOpensAt: Date;
    storeClosesAt: Date;
}