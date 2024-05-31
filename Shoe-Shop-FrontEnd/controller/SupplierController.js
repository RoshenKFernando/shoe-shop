$(document).ready(function() {
    loadAllSupplier();
});

/**
 * Supplier Save
 * */
$("#btnSaveSupplier").attr('disabled', false);
$("#btnUpdateSupplier").attr('disabled', false);
$("#btnDeleteSupplier").attr('disabled', false);


/**
 * Supplier Save
 * Supplier ID
 * */
function generateSupplierID() {
    $("#supplier_code").val("S00-001");

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:"http://localhost:8080/back_End/supplier/SupplierIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function(resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#supplier_code").val("S00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]) + 1;
                let newId = "S00-" + ("000" + tempId).slice(-3);
                $("#supplier_code").val(newId);
            }
        },
        error: function(ob, statusText, error) {
            console.error(error);
        }
    });
}

/**
 * Button Add New Supplier
 * */
$("#btnSaveSupplier").click(function() {
    let formData = $("#supplierForm").serializeArray();

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function(res) {
            saveUpdateAlert("Supplier", res.message);
            loadAllSupplier();
        },
        error: function(xhr, status, error) {
            unSuccessUpdateAlert("Supplier", JSON.parse(xhr.responseText).message);
        }
    });
});

/**
  lear input fields Values Method
* */
function setTextFieldValuesS(code, name, category, address1, address2, address3, address4, address5, contact1, contact2, email) {
    $("#Supplier_code").val(code);
    $("#name").val(name);
    $("#category").val(category);
    $("#S_address_1").val(address1);
    $("#S_address_2").val(address2);
    $("#S_address_3").val(address3);
    $("#S_address_4").val(address4);
    $("#S_address_5").val(address5);
    $("#ContactNo1").val(contact1);
    $("#ContactNo2").val(contact2);
    $("#email").val(email);

    $("#Supplier_code").focus();

    $("#btnSaveSupplier").attr('disabled', false);
    $("#btnUpdateSupplier").attr('disabled', false);
    $("#btnDeleteSupplier").attr('disabled',false);
}


/**
 * load all Supplier Method
 * */
function loadAllSupplier() {
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
 * Table Listener Click and Load textFields
 * */
function blindClickEventsS() {
    $("#suppliersTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let addressColumn = $(this).children().eq(3).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact1 = $(this).children().eq(4).text();
        let contact2 = $(this).children().eq(5).text();
        let email = $(this).children().eq(6).text();


        // Set values to respective input fields
        $("#supplier_code").val(code);
        $("#name").val(name);
        $("#category").val(category);
        $("#S_address_1").val(address1);
        $("#S_address_2").val(address2);
        $("#S_address_3").val(address3);
        $("#S_address_4").val(address4);
        $("#S_address_5").val(address5);
        $("#ContactNo1").val(contact1);
        $("#ContactNo2").val(contact2);
        $("#email").val(email);

    });

    $("#btnSaveSupplier").attr('disabled',false);
}

/**
 * Update Supplier
 * */
$("#btnUpdateSupplier").click(function () {
    let formData = $("#supplierForm").serialize();

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Supplier updated", res.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Supplier update failed", JSON.parse(xhr.responseText).message);
        }
    });
});


/**
 * Delete Supplier
 * */
$("#btnDeleteSupplier").click(function () {
    let id = $("#supplier_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier?code=" + id,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Supplier", resp.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Supplier", message);
        }
    });
});

/**
 * Search id and name Load Table
 * */
$("#form1").on("keypress", function (event) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    if (event.which === 13) {
        var search = $("#form1").val();

        $("#suppliersTable").empty();
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

/**
 * Clear Method
 */
function clearDetails() {
    $('#name,#category,#S_address_1,#S_address_2,#S_address_3,#S_address_4,#S_address_5,#ContactNo1,#ContactNo2,#email').val("");

}

$("#btnClearSupplier").click(function () {
    clearDetails();
});


/**
 * Supplier validation
 */
$("#supplier_code").focus();
const regExSupID = /^(S00-)[0-9]{3,4}$/;
const regExSupName = /^[A-z ]{3,20}$/;
const regExSupAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExSupContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExSupContactNum2 = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExSupEmailSupAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let supplierValidations = [];
supplierValidations.push({
    reg: regExSupID, field: $('#supplier_code'), error: 'Supplier ID Pattern is Wrong : S00-001'
});
supplierValidations.push({
    reg: regExSupName, field: $('#name'), error: 'Supplier Name Pattern is Wrong : A-z 3-20'
});
supplierValidations.push({
    reg: regExSupAddress1, field: $('#S_address_1'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress2, field: $('#S_address_2'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress3, field: $('#S_address_3'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress4, field: $('#S_address_4'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress5, field: $('#S_address_5'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupContactNum, field: $('#ContactNo1'), error: 'Supplier contact is Wrong : Enter email address'
});
supplierValidations.push({
    reg: regExSupContactNum2, field: $('#ContactNo2'), error: 'Employee contact is Wrong : Enter email address'
});
supplierValidations.push({
    reg: regExSupEmailSupAddress, field: $('#email'), error: 'Supplier email is Wrong : Enter email address'
});

$("#supplier_code,#name,#S_address_1,#S_address_2,#S_address_3,#S_address_4,#S_address_5,#ContactNo1,#ContactNo2,#email").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#supplier_code,#name,#S_address_1,#S_address_2,#S_address_3,#S_address_4,#S_address_5,#ContactNo1,#ContactNo2,#email").on('keyup', function (event) {
    checkValidity(supplierValidations);
});

$("#supplier_code,#name,#S_address_1,#S_address_2,#S_address_3,#S_address_4,#S_address_5,#ContactNo1,#ContactNo2,#email").on('blur', function (event) {
    checkValidity(supplierValidations);
});

$("#supplier_code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpID, $("#supplier_code"))) {
        $("#name").focus();
    } else {
        focusText($("#supplier_code"));
    }
});

$("#name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#name"))) {
        focusText($("#category"));
    }
});

$("#S_address_1").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#S_address_1"))) {
        focusText($("#S_address_2"));
    }
});

$("#S_address_2").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#S_address_2"))) {
        focusText($("#S_address_3"));
    }
});

$("#S_address_3").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#S_address_3"))) {
        focusText($("#S_address_4"));
    }
});

$("#S_address_4").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#S_address_4"))) {
        focusText($("#S_address_5"));
    }
});

$("#S_address_5").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#S_address_5"))) {
        focusText($("#ContactNo1"));
    }
});

$("#ContactNo1").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#ContactNo1"))) {
        focusText($("#ContactNo2"));
    }
});

$("#ContactNo2").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#ContactNo2"))) {
        focusText($("#email"));
    }
});

$("#email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#email"))) {
        focusText($("#btnSaveSupplier"));
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveSupplier").attr('disabled', true);
        $("#btnUpdateSupplier").attr('disabled', true);
        $("#btnDeleteSupplier").attr('disabled', true);
    } else {
        $("#btnSaveSupplier").attr('disabled', false);
        $("#btnUpdateSupplier").attr('disabled', false);
        $("#btnDeleteSupplier").attr('disabled',false);
    }
}