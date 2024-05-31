
$(document).ready(function () {
    loadAllItemD()
});

/**
 load all Item Method
 * */
function loadAllItemD() {
    $("#inventoryTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/item",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let qty = i.qty;
                let itemPicture = i.itemPicture || '';
                let category = i.category;
                let size = i.size;
                let supplier = i.supplier;
                let supName = i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit; // Use the provided expected profit
                let profitMargin = i.profitMargin;
                let status = i.status;

                let supId = supplier?.code || '';

                let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
            }
            blindClickEventsI();
            setTextFieldValueI("", "", "", "", "", "", "", "", "", "", "", "", "");
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

/**
 * Search id and name Load Table
 * */
$("#search_inv_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_inv_Id").val();
        $("#inventoryTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url:"http://localhost:8080/back_End/item/searchItem",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search,
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let code = res.code;
                let Name = res.name;
                let qty = res.qty;
                let category = res.shoeType;
                let size = res.size;
                let supplier = res.supplier?.code || '';
                let supName = res.supName;
                let salePrice = res.salePrice;
                let buyPrice = res.buyPrice;
                let expectedProfit = salePrice - buyPrice; // Calculate expected profit
                let profitMargin = res.profitMargin;
                let status = res.status;

                let row = `<tr><td>${code}</td><td>${Name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supplier}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
                blindClickEventsI();
            },
            error: function (error) {
                loadAllItem();
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
});