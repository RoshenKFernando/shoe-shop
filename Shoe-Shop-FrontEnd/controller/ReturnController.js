
loadReturnOrders();

$('#option').change(function (){
    $('#return_item_code').val('')
    $('#return_item_qty').val('')
    if ($('#option').val()==='FullOrder'){
        $('#return_code').addClass('d-none')
        $('#return_qty').addClass('d-none')
    }else {
        $('#return_code').removeClass('d-none')
        $('#return_qty').removeClass('d-none')
    }
})

$('#btnAddReturn').click(function (){
    let code = $('#return_order_code').val()
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/sales/"+code,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            if (resp.data){
                returnOrder(code);

            }else {
                alert("can not return")
            }

        },
        error: function (ob, statusText, error) {

        }
    })
});

/*function returnOrder(code) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/sales/" + code,
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            loadReturnOrders();
        },
        error: function (ob, statusText, error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);

        }
    });

}*/

function returnOrder(code) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    if ($("#option").val()==='FullOrder'){

        $.ajax({
            url: "http://localhost:8080/back_End/sales/" + code,
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function (resp) {
                loadReturnOrders();
            },
            error: function (ob, statusText, error) {
                let message = JSON.parse(error.responseText).message;
                console.log(message);

            }
        });
    }else {
        const data = {
            oid : code,
            itemCode : $("#return_item_code").val(),
            qty: $("#return_item_qty").val()

        }
        console.log("not work");
        $.ajax({
            url:  "http://localhost:8080/back_End/sales/returnOneOrder" ,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            // dataType: "json",
            success: function (resp) {
                loadReturnOrders();
            },
            error: function (ob, statusText, error) {
                // let message = JSON.parse(error.responseText).message;
                // console.log(message);

            }
        });
    }


}


function loadReturnOrders(){
    // performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/sales/loadData",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            $("#returnTable").empty();
            for (const respElement of resp.data) {


                let row = `<tr>
            <td>${respElement.oid}</td>
            <td>${respElement.itemCode}</td>
            <td>${respElement.qty}</td>
            <td>${respElement.return_qty}</td>
            <td>${respElement.status}</td>
                </tr>`;
                $("#returnTable").append(row);

            }
        },
        error: function (ob, statusText, error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);

        }
    });


}
