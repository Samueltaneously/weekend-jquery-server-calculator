$(document).ready(handleReady);

let inputOperation;
let solutions;
let plus;
let minus;
let multiply;
let divide;

function handleReady() {
    console.log("jquery is loaded!")

    $('button').on("click", selectOperator);
    $('#equals').on("click", handleSubmit);
    $('#clear').on("click", handleClear);
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
        // console.log("POST was successful:", response)
        // console.log("POST was:", inputOperation)
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
            plus = '+';
        }
        if ($(this).hasClass('minus')) {
            minus = '-';
        }
        if ($(this).hasClass('multiply')) {
            multiply = '*';
        }
        if ($(this).hasClass('divide')) {
            divide = '/';
        }
    }

    else if ($(this).hasClass('selectedOperation')) {
        $(this).removeClass('selectedOperation')
        $(this).addClass('operationOff')
        $('.operationOff').attr('disabled', false)
        plus = '';
        minus = '';
        multiply = '';
        divide = '';
    }
    // console.log(plus, minus, multiply, divide);
}

function handleData() {
    $.ajax({
        method: "GET",
        url: '/solution',
    }).then((response) => {
        solutions = response
        // console.log("GET was successful:", solutions)
        render(solutions)
    }).catch((error) => {
        // console.log('error caught', error)
        // alert('ERRORRRRR')
    })
}


function render(data) {
    console.log(data);
    let currentOperation = data[0].solution;
    $('#solution').text(`${currentOperation}`)
    $('#operations').empty()
    for (let each of data) {
    $('#operations').append(`<div>
    ${each.input1} ${each.operation} ${each.input2} = ${each.solution}
    </div>`)}
    
}

let handleClear = () => {
    let input1 = $('#input1').val('');
    let input2 = $('#input2').val('');
}