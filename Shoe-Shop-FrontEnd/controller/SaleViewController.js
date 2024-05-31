
$(document).ready(function () {
    loadAllSales()
});

$(document).ready(function () {
    loadAllOrderDetails()
});


function loadAllSales() {
    $("#tblOrder").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/sales/LoadOrders",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let purchaseDate = i.purchaseDate;
                let total = i.total;
                let paymentMethod = i.paymentMethod;
                let totalPoints = i.totalPoints;
                let cashier = i.cashier;
                let cus = i.customer;
                let id = cus.code;
                let name = cus.name;
                let status= i.status

                let customer = `${id}-${name}`;

                let row = "<tr><td>" + oid + "</td><td>" + purchaseDate + "</td><td>" + total + "</td><td>" + paymentMethod + "</td><td>" + cashier + "</td><td>" +totalPoints +  "</td><td>" + customer + "</td><td>" + status + "</td></tr>";
                $("#tblOrder").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

function loadAllOrderDetails() {
    $("#tblOrderDetails").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/sales/LoadOrderDetails",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let itemCode = i.itemCode;
                let qty = i.qty;
                let unitPrice = i.unitPrice;

                let row = "<tr><td>" + oid + "</td><td>" + itemCode + "</td><td>" + qty + "</td><td>" + unitPrice + "</td></tr>";
                $("#tblOrderDetails").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}


