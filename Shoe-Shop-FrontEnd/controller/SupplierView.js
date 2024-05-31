$(document).ready(function () {
    loadAllSupplierDe()
});

/**
 * load all Supplier Method
 * */
function loadAllSupplierDe() {
    $("#suppliersTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function(res) {
            for (let supplier of res.data) {
                let code = supplier.code;
                let name = supplier.name;
                let category = supplier.category;
                let address = supplier.address || {};
                let contact1 = supplier.contact1;
                let contact2 = supplier.contact2;
                let email = supplier.email;

                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';
                let addressColumn =  `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                let row = `<tr><td>${code}</td><td>${name}</td><td>${category}</td><td>${addressColumn}</td><td>${contact1}</td><td>${contact2}</td><td>${email}</td></tr>`;
                $("#suppliersTable").append(row);
            }
            blindClickEventsS()
            generateSupplierID();
            setTextFieldValuesS("", "", "", "", "", "", "", "", "", "", "");
        },
        error: function(error) {
            console.error(error);
        }
    });
}

/**
 * Search id and name Load Table
 * */
$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#suppliersTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/back_End/supplier/searchSupplier",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search, // Provide the 'code' parameter
                name: search  // Provide the 'name' parameter
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let category = res.category;
                    let address = res.address || '';
                    let contact1 = res.contact1;
                    let contact2 = res.contact2;
                    let email = res.email;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    // Concatenate address properties
                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;


                    let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + category +  "</td><td>" + addressColumn + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>"  + email +  "</td></tr>";
                    $("#suppliersTable").append(row);
                    blindClickEventsS()
                }
            },
            error: function (error) {
                loadAllSupplier()
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