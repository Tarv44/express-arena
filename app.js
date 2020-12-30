const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      App: ${req.app}
      Body: ${req.body}
      IP: ${req.ip}
      Method: ${req.method}
      Params: ${req.params}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/sum', (req, res) => {
    const aNum = Number(req.query.a);
    const bNum = Number(req.query.b);

    const sum = String(aNum + bNum);

    res.send(`The sum of ${req.query.a} and ${req.query.b} is ${sum}`)
})

app.get('/cipher', (req, res) => {
    const text = req.query.text
    const shift = Number(req.query.shift)

    const cipher = text.split('').map(l => {
        const charNum = l.charCodeAt(0)
        const cipherNum = charNum + shift
        return String.fromCharCode(cipherNum)
    }).join('')

    res.send(cipher)
})

app.get('/lotto', (req, res) => {
    const userNums = req.query.num;
    const lottoNums = [];
    let matchCount = 0;
    let resMsg

    while (lottoNums.length < 6) {
        const num = Math.floor((Math.random() * 20) + 1)
        if (!lottoNums.includes(num)){
            lottoNums.push(num)
        }
    }

    for (let i = 0; i < userNums.length; i++) {
        const userNum = Number(userNums[i])
        if (lottoNums.includes(userNum)) {
            matchCount += 1
        }
    }

    if (matchCount === 6) {
        resMsg = `Wow! Unbelievable! You could have won the mega millions!`
    } else if (matchCount === 5) {
        resMsg = 'Congratulations! You win $100!'
    } else if (matchCount === 4) {
        resMsg = 'Congratulations, you win a free ticket'
    } else {
        resMsg = `Sorry, you lose. You had ${matchCount} numbers that matched.`
    }
    res.send(resMsg)
})

app.listen(8000, () => {
    console.log('Listening to port 8000')
})