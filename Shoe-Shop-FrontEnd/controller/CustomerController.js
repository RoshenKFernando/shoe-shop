
$(document).ready(function () {
    loadAllCus();
});


function updateDateTime() {
    let currentDateTime = new Date();

    let year = currentDateTime.getFullYear();
    let month = currentDateTime.getMonth() + 1;
    let day = currentDateTime.getDate();

    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    let formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    $('#recentPurchaseDate').val(`${formattedDate} ${formattedTime}`);
}

updateDateTime();

setInterval(updateDateTime,1000);

/**
 * Customer Save
 * */
$("#btnSaveCustomer").attr('disabled', false);
$("#btnUpdateCustomer").attr('disabled', false);
$("#btnDeleteCustomer").attr('disabled', false);


/**
 * Customer Save
 * Customer ID
 * */
function generateCustomerID() {
    $("#cusId").val("C00-001");
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/customer/cusIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#cusId").val("C00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#cusId").val("C00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#cusId").val("C00-0" + tempId);
                } else {
                    $("#cusId").val("C00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * load all Customer Table Method
 * */
function loadAllCus() {
    $("#customerTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/customer",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let gender = i.gender
                let level = i.level;
                let loyaltyDate = i.loyaltyDate
                let loyaltyPoints = i.loyaltyPoints;
                let dob = i.dob;
                let address = i.address;
                let time = i.contact;
                let email = i.email
                let recentPurchaseDate =i.recentPurchaseDate;

                let ad1 = address.address1;
                let ad2 = address.address2;
                let ad3 = address.address3;
                let ad4 = address.address4;
                let ad5 = address.address5;

                let addressColumn = ad1 + ", " + ad2 + ", " + ad3 + ", " + ad4 + ", " + ad5;

                let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + level + "</td><td>" +loyaltyDate+ "</td><td>" +loyaltyPoints + "</td><td>" + dob + "</td><td>" + addressColumn + "</td><td>" + time + "</td><td>" + email + "</td><td>" + recentPurchaseDate + "</td></tr>";
                $("#customerTable").append(row);

            }
            generateCustomerID();
             blindClickEventsC()
            setTextFieldValuesC("", "", "", "", "", "", "", "", "", "", "","");

            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}


/**
 * Update Customer
 * */
$("#btnUpdateCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/customer",
        method: "PUT",
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            saveUpdateAlert("Item updated", res.message);
            loadAllCus()
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item update failed", JSON.parse(xhr.responseText).message);
        }
    });

});


/**
 * Button Add New Customer
 * */
$("#btnSaveCustomer").click(function (){
    let formData = $("#customerForm").serialize();
    let cusId = $("#cusId").val();
    /*formData += "&code="+cusId;*/
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/customer",
        method: "POST",
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Customer", res.message);
            loadAllCus()
             generateCustomerID()

        }, error: function (error) {
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});


/**
 lear input fields Values Method
 * */
function setTextFieldValuesC(code, name,gender,loyaltyDate,level,loyaltyPoints,dob,address1,address2,address3,address4,address5,contact,email,recentPurchaseDate) {
    $("#cusId").val(code);
    $("#customer_name").val(name);
    $("#gender").val(gender);
    $("#loyaltyDate").val(loyaltyDate);
    $("#level").val(level);
    $("#total_point").val(loyaltyPoints);
    $("#DOB").val(dob);
    $("#c_address_01").val(address1);
    $("#c_address_02").val(address2);
    $("#c_address_03").val(address3);
    $("#c_address_04").val(address4);
    $("#c_address_05").val(address5);
    $("#c_contact_num").val(contact);
    $("#customer_email").val(email);
    $("#recentPurchaseDate").val(recentPurchaseDate);

    $("#cusId").focus();

    // Enable buttons
    $("#btnSaveCustomer").attr('disabled', false);
    $("#btnUpdateCustomer").attr('disabled', false);
    $("#btnDeleteCustomer").attr('disabled', false);
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsC() {
    $("#customerTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let loyaltyDate = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let loyaltyPoints = $(this).children().eq(5).text();
        let dob = $(this).children().eq(6).text();
        let addressColumn = $(this).children().eq(7).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact = $(this).children().eq(8).text();
        let email = $(this).children().eq(9).text();
        let recentPurchaseDate = $(this).children().eq(10).text();



        // Set values to respective input fields
        $("#cusId").val(code);
        $("#customer_name").val(name);
        $("#gender").val(gender);
        $("#loyaltyDate").val(loyaltyDate);
        $("#level").val(level);
        $("#total_point").val(loyaltyPoints);
        $("#DOB").val(dob);
        $("#c_address_01").val(address1);
        $("#c_address_02").val(address2);
        $("#c_address_03").val(address3);
        $("#c_address_04").val(address4);
        $("#c_address_05").val(address5);
        $("#c_contact_num").val(contact);
        $("#customer_email").val(email);
        $("#recentPurchaseDate").val(recentPurchaseDate);

    });

    $("#btnSaveCustomer").attr('disabled',false);
}

/**
 * Delete Customer
 * */
$("#btnDeleteCustomer").click(function () {
    let id = $("#cusId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/customer?code=" + id,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Customer", resp.message);
            loadAllCus()
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Customer", message);
        }
    });
});


/**
 * Search id and name Load Table
 * */
$("#form2").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form2").val();
        $("#customerTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/back_End/customer/searchCustomer",
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
                    let gender = res.gender;
                    let level = res.level;
                    let loyaltyDate = res.loyaltyDate;
                    let loyaltyPoints = res.loyaltyPoints;
                    let dob = res.dob;
                    let address = res.address || '';
                    let time = res.contact;
                    let email = res.email;
                    let recentPurchaseDate = res.recentPurchaseDate;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    // Concatenate address properties
                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                    let row = "<tr><td>" + code + "</td><td>" + name  + "</td><td>" + gender + "</td><td>" + level + "</td><td>" + loyaltyDate + "</td><td>" + loyaltyPoints + "</td><td>" + dob + "</td><td>" + addressColumn + "</td><td>" + time + "</td><td>" + email + "</td><td>" + recentPurchaseDate +"</td></tr>";
                    $("#customerTable").append(row);
                    blindClickEventsC()
                }
            },
            error: function (error) {
                loadAllCus()
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
    $('#customer_name,#gender,#loyaltyDate,#level,#total_point,#DOB,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email').val("");

}

$("#btnClearCustomer").click(function () {
    clearDetails();
});



/**
 * Customer Validation
 */
/**
 * Auto Forces Input Fields Save
 * */
$("#cusId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusPoint = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const regExCusAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExCusEmailCusAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExCusContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID, field: $('#cusId'), error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName, field: $('#customer_name'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusPoint, field: $('#total_point'), error: 'Customer Point is Wrong : Enter Number'
});
customerValidations.push({
    reg: regExCusAddress1, field: $('#c_address_01'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress2, field: $('#c_address_02'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress3, field: $('#c_address_03'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress4, field: $('#c_address_04'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress5, field: $('#c_address_05'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusContactNum, field: $('#c_contact_num'), error: 'Customer email is Wrong : Enter email address'
});
customerValidations.push({
    reg: regExCusEmailCusAddress, field: $('#customer_email'), error: 'Customer email is Wrong : Enter email address'
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#cusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusID, $("#cusId"))) {
        $("#customer_name").focus();
    } else {
        focusText($("#cusId"));
    }
});

$("#customer_name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusName, $("#customer_name"))) {
        focusText($("#customer_gender"));
    }
});

$("#total_point").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusPoint, $("#total_point"))) {
        focusText($("#customer_dob"));
    }
});

$("#c_address_01").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress1, $("#c_address_01"))) {
        focusText($("#c_address_02"));
    }
});

$("#c_address_02").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#c_address_02"))) {
        focusText($("#c_address_03"));
    }
});

$("#c_address_03").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress3, $("#c_address_03"))) {
        focusText($("#c_address_04"));
    }
});

$("#c_address_04").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#c_address_04"))) {
        focusText($("#c_address_05"));
    }
});

$("#c_contact_num").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusContactNum, $("#c_contact_num"))) {
        focusText($("#customer_email"));
    }
});
$("#customer_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#customer_email"))) {
        focusText($("#purchaseDate"));
    }
});

$("#customer_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#customer_email"))) {
        if (event.which === 13) {
            $('#btnSaveCustomer').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveCustomer").attr('disabled', true);
        $("#btnUpdateCustomer").attr('disabled', true);
        $("#btnDeleteCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
        $("#btnUpdateCustomer").attr('disabled', false);
        $("#btnDeleteCustomer").attr('disabled',false);
    }
}





