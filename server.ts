import express from "express";
const app = express();

app.use(express.json());
app.use(express.static("public"));

const port: number = 5454;

interface Card {
    similarNum: number
    img: string
}

const cards: Array<Card> = [
    { similarNum: 1, img: "./img/1.jpg" },
    { similarNum: 2, img: "./img/2.jpg" },
    { similarNum: 3, img: "./img/3.jpg" },
    { similarNum: 4, img: "./img/4.jpg" },
    { similarNum: 5, img: "./img/5.jpg" },
    { similarNum: 6, img: "./img/6.jpg" },
    { similarNum: 7, img: "./img/7.jpg" },
    { similarNum: 8, img: "./img/8.jpg" },
    { similarNum: 9, img: "./img/9.jpg" },
    { similarNum: 10, img: "./img/10.jpg" },
    { similarNum: 11, img: "./img/11.jpg" },
    { similarNum: 12, img: "./img/12.jpg" },
]

function shuffleCards(arr) {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
}

app.post('/get-data', (req, res) => {
    const { numOfCards } = req.body
    console.log(numOfCards)

    let shuffleCardsToSend
    const doubleCardsArr = [];

    arrcard(numOfCards)

    async function arrcard(numCard) {
        shuffleCardsToSend = await shuffleCards(cards).slice(0, numCard)

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < shuffleCardsToSend.length; j++) {
                doubleCardsArr.push(shuffleCardsToSend[j])
            }
        }

        console.log(doubleCardsArr.length)

        const arrCardsToClient = shuffleCards(doubleCardsArr)

        res.status(200).send(arrCardsToClient)
    }
})


app.get('/check', (req, res) => {
    try {
        const { openFirst } = req.query
        const { openSecond } = req.query

        console.log(openFirst)
        console.log(openSecond)

        if (openFirst && openSecond) {
            console.log(`the first number is ${openFirst} and second ${openSecond}`)
            console.log(openFirst)
            console.log(openSecond)

            if (openFirst === openSecond) {
                res.send(true)
            } else {
                res.send(false)
            }
        }
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server listen on port http://localhost:${port}`);
});