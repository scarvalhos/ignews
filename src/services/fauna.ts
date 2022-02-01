import { Client } from 'faunadb'

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
    scheme: 'https',
    domain: 'db.us.fauna.com',
})