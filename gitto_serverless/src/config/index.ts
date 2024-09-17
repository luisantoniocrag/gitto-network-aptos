import * as dotenv from 'dotenv';

dotenv.config()

const API_PINATA_CLOUD_JWT = process.env.PINATA_JWT
const API_PINATA_GATEWAY_URL = process.env.GATEWAY_URL
export {
    API_PINATA_CLOUD_JWT,
    API_PINATA_GATEWAY_URL
}