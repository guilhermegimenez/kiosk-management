import { test } from 'tap'
import { build } from '../helper'

test('Kiosk Routes Test', async (t) => {
    const app = await build(t)
    test('Get Kiosk by ID', async (t) => {
        test('Bad Request', async (t) => {
            const res = await app.inject({
                method: 'GET',
                url: '/kiosks/1'
            })
            t.equal(res.statusCode, 400)
        })
    })
})
