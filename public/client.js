$(document).ready(handleReady);

let inputOperation;
let solution;
let plus = false;
let minus = false;
let multiply = false;
let divide = false;

function handleReady() {
    console.log("jquery is loaded!")

    $('button').on("click", selectOperator);
    $('#equals').on("click", handleSubmit);

}


// Submit and send data
function handleSubmit() {

    let input1 = $('#input1').val();
    let input2 = $('#input2').val();
    inputOperation = {
        val1: input1,
        val2: input2,
        plus: plus,
        minus: minus,
        multiply: multiply,
        divide: divide
    };

    $.ajax({
        method: "POST",
        url: '/calculations',
        data: inputOperation
    }).then((response) => {
        handleData()
        console.log("POST was successful:", response)
        console.log("POST was:", inputOperation)
    }).catch((error) => {
        // console.log('error caught', error)
        // alert('ERRORRRRR')
    })
}

// Determine operator to use
function selectOperator() {
    if ($(this).hasClass('operationOff')) {
        $(this).removeClass('operationOff')
        $(this).addClass('selectedOperation')
        $('.operationOff').attr('disabled', true)
        if ($(this).hasClass('plus')) {
            plus = true;
        }
        if ($(this).hasClass('minus')) {
            minus = true;
        }
        if ($(this).hasClass('multiply')) {
            multiply = true;
        }
        if ($(this).hasClass('divide')) {
            divide = true;
        }
    }

    else if ($(this).hasClass('selectedOperation')) {
        $(this).removeClass('selectedOperation')
        $(this).addClass('operationOff')
        $('.operationOff').attr('disabled', false)
        plus = false;
        minus = false;
        multiply = false;
        divide = false;
    }
    // console.log(plus, minus, multiply, divide);
}

function handleData() {
    $.ajax({
        method: "GET",
        url: '/solution',
    }).then((response) => {
        solution = response
        console.log("GET was successful:", solution)
        render()
    }).catch((error) => {
        // console.log('error caught', error)
        // alert('ERRORRRRR')
    })
}


function render() {
    $('#solution').text(`${solution}`)
}