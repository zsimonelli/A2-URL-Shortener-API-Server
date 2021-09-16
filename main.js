const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send({ 'Hello': 'World' })
})

app.get('/:lurl', (req, res) => {
    res.send({
        'surl':(Math.random() + 1).toString(36).substring(7),
        'q': req.query.q === undefined ? null : req.query.q,
    
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

