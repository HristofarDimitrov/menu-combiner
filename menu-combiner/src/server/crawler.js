const express = require("express");
const puppeteer = require('puppeteer');

const app = express();
const cors = require('cors');
const e = require("express");
const { getPivniceUcapaData, getSuziesData, getMemickaData } = require("./utils");
const port = 3000;

app.use(cors())

app.get("/crawler", async (req, res, next) => {
    res.set('Content-Type', 'text/html');
    try {
        const data = await getPivniceUcapaData();
        // console.log(data);

        const data2 = await getSuziesData();
        // console.log(data2);

        const data3 = await getMemickaData();
        console.log(data3);

        return res.status(200).send(Buffer.from(data));
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
