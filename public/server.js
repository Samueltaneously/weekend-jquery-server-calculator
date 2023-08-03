const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let recievedData;

let operationHistory = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


app.post('/calculations', (req, res) => {
  // console.log('made it to req body', req.body)
  recievedData = req.body
  calculations(recievedData)
  res.sendStatus(201)
})

app.get('/solution', (req, res) => {
  res.send(operationHistory)
  // console.log('solution is', solution);
})

function calculations(data) {
  
  if (data.plus === '+') {
    let solution = (Number(data.val1) + Number(data.val2))
    console.log(solution);
    operationHistory.unshift(
      {
        input1: data.val1,
        input2: data.val2,
        operation: "+",
        solution: solution
      }
    )
  }

  else if (data.minus === '-') {
    let solution = Number((data.val1) - (data.val2))
    operationHistory.unshift(
      {
        input1: data.val1,
        input2: data.val2,
        operation: "-",
        solution: solution
      }
    )
  }

  else if (data.multiply === '*') {
    let solution = Number((data.val1) * (data.val2))
    operationHistory.unshift(
      {
        input1: data.val1,
        input2: data.val2,
        operation: "*",
        solution: solution
      }
    )
  }

  else if (data.divide === '/') {
    let solution = Number((data.val1) / (data.val2))
    operationHistory.unshift(
      {
        input1: data.val1,
        input2: data.val2,
        operation: "/",
        solution: solution
      }
    )
  }
}




app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})