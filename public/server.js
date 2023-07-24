const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let recievedData;
let solution;
let operationHistory = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


app.post('/calculations', (req, res) => {
  console.log('made it to req body', req.body)
  recievedData = req.body
  calculations(recievedData)
  res.sendStatus(201)
})

app.get('/solution', (req, res) => {
  res.send(solution + '')
  console.log('solution is', solution);
})

function calculations(data) {
  
  if (data.plus == true) {
    solution = data.val1 + data.val2
    operationHistory.unshift(
      {
        input1: input1,
        input2: input2,
        operation: plus
      }
    )
  }

  else if (recievedData.minus == true) {
    solution = Number((recievedData.input1) - (recievedData.input2))
    operationHistory.unshift(
      {
        input1: input1,
        input2: input2,
        operation: minus
      }
    )
  }

  else if (recievedData.multiply == true) {
    solution = Number((recievedData.input1) * (recievedData.input2))
    operationHistory.unshift(
      {
        input1: input1,
        input2: input2,
        operation: multiply
      }
    )
  }

  else if (recievedData.divide == true) {
    solution = Number((recievedData.input1) / (recievedData.input2))
    operationHistory.unshift(
      {
        input1: input1,
        input2: input2,
        operation: divide
      }
    )
  }
}




app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})