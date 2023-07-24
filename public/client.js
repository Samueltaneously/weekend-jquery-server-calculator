$(document).ready(handleReady);

let input;
let plus = false;
let minus = false;
let multiply = false;
let divide = false;

function handleReady() {
    console.log("jquery is loaded!")

    $('button').on("click", selectOperator);

    $('#plus').on("click", handleSubmit);

}



function handleSubmit() {

let input1 = $('#input1').val();
let input2 = $('#input2').val();
// let operation = ;

    $.ajax({
        method: "POST",
        url: '/input',
        data: input
      }).then((response) => {
        console.log("POST was successful:", response)
      }).catch((error) => {
        // console.log('error caught', error)
        // alert('ERRORRRRR')
      })
}


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
