const express = require("express");
const puppeteer = require('puppeteer');

const app = express();
const cors = require('cors');
const { getPivniceUcapaData, getSuziesData, getMemickaData } = require("./utils");
const port = 3000;

app.use(cors())

app.get("/crawler", async (req, res, next) => {
    res.set('Content-Type', 'text/html');
    try {
        const data1 = await getPivniceUcapaData();
        const data2 = await getSuziesData();
        const data3 = await getMemickaData();

        const result = [
            { name: "Pivnice Ucapa", menuItems: data1 },
            { name: "Suzies", menuItems: data2 },
            { name: "Memicka", menuItems: data3 }
        ]

        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({ message: "Error ocure", error })
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
