
/*let BaseUrl = "http://localhost:8080/back_End/";*/

$(document).ready(function () {
    loadAllEmployee();
});


/**
 * Employee Save
 * */
$("#btnSaveEmployee").attr('disabled', false);
$("#btnUpdateEmployee").attr('disabled', false);
$("#btnDeleteEmployee").attr('disabled', false);

/**
 * Employee Save
 * Employee ID
 * */
function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/employee/EmployeeIdGenerate",
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
                $("#Employee_code").val("E00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#Employee_code").val("E00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#Employee_code").val("E00-0" + tempId);
                } else {
                    $("#Employee_code").val("E00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}



/**
 * Button Add New Employee
 * */
$("#btnSaveEmployee").click(function (){

    var image = $("#imgEmp");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assest/img/login.jpg') {
        alert("Error");
    }

    let formData = $("#EmployeeForm").serializeArray();
    formData.push({name: "pic", value: imageUrl});
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/employee",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Employee", res.message);
            loadAllEmployee()
            /*generateEmployeeID();*/

        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});


/**
 * clear input fields Values Method
 * */
function setTextFieldValues(code, name, pic, gender,status,designation,role,birth,joinDate,branch,E_address_1,E_address_2,E_address_3,E_address_4,E_address_5,contact,email,person,EmgContact) {
    $("#Employee_code").val(code);
    $("#employee_name").val(name);
    $("#EProfile_pic").val(pic);
    $("#E_gender").val(gender);
    $("#E_status").val(status);
    $("#designation").val(designation);
    $("#E_AccessRole").val(role);
    $("#E_dob").val(birth);
    $("#E_DOF").val(joinDate);
    $("#E_Attached").val(branch);
    $("#E_address_1").val(E_address_1);
    $("#E_address_2").val(E_address_2);
    $("#E_address_3").val(E_address_3);
    $("#E_address_4").val(E_address_4);
    $("#E_address_5").val(E_address_5);
    $("#E_ContactNo").val(contact);
    $("#E_email").val(email);
    $("#ICE").val(person);
    $("#E_E_contact").val(EmgContact);

    $("#Employee_code").focus();
    // checkValidity(employeeValidations);

    $("#btnSaveEmployee").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled',false);
}


/**
load all Employee Method
* */
function loadAllEmployee() {
    $("#employeeTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/employee/loadAllEmployee",
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
                let pic = i.pic || ''; // Use empty string if pic is null
                let gender = i.gender;
                let status = i.status;
                let designation = i.designation;
                let role = i.role;
                let birth = i.birth;
                let joinDate = i.joinDate;
                let branch = i.branch;
                let address = i.address || {}; // Use empty object if address is null
                let contact = i.contact;
                let email = i.email;
                let person = i.person;
                let EmgContact = i.emgContact;
                // Access address properties correctly
                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';

                // Concatenate address properties
                let addressColumn =` ${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;


                let row = `<tr><td>${code}</td><td>${name}</td><td>${gender}</td><td>${status}</td><td>${designation}</td><td>${role}</td><td>${birth}</td><td>${joinDate}</td><td>${branch}</td><td>${addressColumn}</td><td>${contact}</td><td>${email}</td><td>${person}</td><td>${EmgContact}</td></tr>`;
                $("#employeeTable").append(row);
            }
           blindClickEventsE();
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

/**
 * Set Employee Pic
 */
$('#EProfile_pic').change(function() {
    var fileInput = $('#EProfile_pic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#imgEmp').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsE() {
    $("#employeeTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let status = $(this).children().eq(3).text();
        let designation = $(this).children().eq(4).text();
        let role = $(this).children().eq(5).text();
        let birth = $(this).children().eq(6).text();
        let joinDate = $(this).children().eq(7).text();
        let branch = $(this).children().eq(8).text();
        let addressColumn = $(this).children().eq(9).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact = $(this).children().eq(10).text();
        let email = $(this).children().eq(11).text();
        let person = $(this).children().eq(12).text();
        let EmgContact = $(this).children().eq(13).text();

        // Set values to respective input fields
        $("#Employee_code").val(code);
        $("#employee_name").val(name);
        $("#E_gender").val(gender);
        $("#E_status").val(status);
        $("#E_Designation").val(designation);
        $("#E_AccessRole").val(role);
        $("#E_dob").val(birth);
        $("#E_DOF").val(joinDate);
        $("#E_Attached").val(branch);
        $("#E_address_1").val(address1);
        $("#E_address_2").val(address2);
        $("#E_address_3").val(address3);
        $("#E_address_4").val(address4);
        $("#E_address_5").val(address5);
        $("#E_ContactNo").val(contact);
        $("#E_email").val(email);
        $("#ICE").val(person);
        $("#E_E_contact").val(EmgContact);
    });

    $("#btnSaveEmployee").attr('disabled',false);
}


/**
 * Update Employee
 * */
$("#btnUpdateEmployee").click(function () {
    let formData = $("#EmployeeForm").serialize();
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken')
    $.ajax({
        url: "http://localhost:8080/back_End/employee/update",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("updated", res.message);
            loadAllEmployee()
        },
        error: function (error) {
            unSuccessUpdateAlert("updated", JSON.parse(error.responseText).message);
        }
    });
});


/**
 * Delete Employee
 * */
$("#btnDeleteEmployee").click(function () {
    let id = $("#Employee_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken')
    $.ajax({
        url:"http://localhost:8080/back_End/employee?code=" + id ,
        method: "delete",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Employee", resp.message);
            loadAllEmployee();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Employee", message);
        }
    });
});


/**
 * Search id and name Load Table
 * */
$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#employeeTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken')
        $.ajax({
            url: "http://localhost:8080/back_End/employee/searchEmployee",
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
                    let gender = res.gender
                    let status = res.status
                    let designation = res.designation;
                    let role = res.role;
                    let joinDate = res.joinDate;
                    let dob = res.birth;
                    let branch = res.branch;
                    let address = res.address || '';
                    let contact = res.contact;
                    let person = res.person;
                    let eContact = res.emgContact;
                    let email = res.email;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                    let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + designation + "</td><td>" + role + "</td><td>" + joinDate + "</td><td>" + dob + "</td><td>" + branch + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + person + "</td><td>" + eContact + "</td><td>" + email + "</td></tr>";
                    $("#employeeTable").append(row);
                    blindClickEventsE()
                }
            },
            error: function (error) {
                loadAllEmployee()
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
    $('#employee_name,#E_gender,#E_status,#E_Designation,#E_AccessRole,#E_dob,#E_DOF,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact,#EProfile_pic').val("");

}

$("#btnClearEmployee").click(function () {
    clearDetails();
});


/**
 * Auto Forces Input Fields Save
 * */
$("#Employee_code").focus();
const regExEmpID = /^(E00-)[0-9]{3,4}$/;
const regExEmpName = /^[A-z ]{3,20}$/;
const regExEmpStatus = /^[A-z ]{3,20}$/;
const regExEmpBranch = /^[A-z ]{3,20}$/;
const regExEmpAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExEmpEmailEmpAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExEmpEmergency = /^[A-z ]{3,20}$/;
const regExEmpEmergencyContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let employeeValidations = [];
employeeValidations.push({
    reg: regExEmpID, field: $('#Employee_code'), error: 'Employee ID Pattern is Wrong : E00-001'
});
employeeValidations.push({
    reg: regExEmpName, field: $('#employee_name'), error: 'Employee Name Pattern is Wrong : A-z 3-20'
});
employeeValidations.push({
    reg: regExEmpStatus, field: $('#E_status'), error: 'Employee Status Pattern is Wrong : A-z 3-20'
});
employeeValidations.push({
    reg: regExEmpBranch, field: $('#E_Attached'), error: 'Employee Branch Pattern is Wrong : A-z 3-20'
});
employeeValidations.push({
    reg: regExEmpAddress1, field: $('#E_address_1'), error: 'Employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress2, field: $('#E_address_2'), error: 'Employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress3 , field: $('#E_address_3'), error: 'Employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress4, field: $('#E_address_4'), error: 'Employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress5 , field: $('#E_address_5'), error: 'Employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpContactNum, field: $('#E_ContactNo'), error: 'Employee email is Wrong : Enter email address'
});
employeeValidations.push({
    reg: regExEmpEmailEmpAddress, field: $('#E_email'), error: 'Employee email is Wrong : Enter email address'
});
employeeValidations.push({
    reg: regExEmpEmergency, field: $('#ICE'), error: 'Employee Name Pattern is Wrong : A-z 3-20'
});
employeeValidations.push({
    reg: regExEmpEmergencyContactNum, field: $('#E_E_contact'), error: 'Employee email is Wrong : Enter email address'
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('keyup', function (event) {
    checkValidity(employeeValidations);
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('blur', function (event) {
    checkValidity(employeeValidations);
});

$("#Employee_code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpID, $("#Employee_code"))) {
        $("#employee_name").focus();
    } else {
        focusText($("#Employee_code"));
    }
});

$("#employee_name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#employee_name"))) {
        focusText($("#E_gender"));
    }
});

$("#E_status").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpStatus, $("#E_status"))) {
        focusText($("#E_Designation"));
    }
});

$("#E_address_1").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress1, $("#E_address_1"))) {
        focusText($("#E_address_2"));
    }
});

$("#E_address_2").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress2, $("#E_address_2"))) {
        focusText($("#E_address_3"));
    }
});

$("#E_address_3").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress3, $("#E_address_3"))) {
        focusText($("#E_address_4"));
    }
});

$("#E_address_4").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress4, $("#E_address_4"))) {
        focusText($("#E_address_5"));
    }
});
$("#E_ContactNo").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpContactNum, $("#E_ContactNo"))) {
        focusText($("#E_email"));
    }
});
$("#E_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpEmailEmpAddress, $("#E_email"))) {
        focusText($("#ICE"));
    }
});
$("#ICE").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpEmergency, $("#ICE"))) {
        focusText($("#E_E_contact"));
    }
});
$("#E_E_contact").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpEmergencyContactNum, $("#E_E_contact"))) {
        focusText($("#btnSaveEmployee"));
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveEmployee").attr('disabled', true);
        $("#btnUpdateEmployee").attr('disabled', true);
        $("#btnDeleteEmployee").attr('disabled', true);
    } else {
        $("#btnSaveEmployee").attr('disabled', false);
        $("#btnUpdateEmployee").attr('disabled', false);
        $("#btnDeleteEmployee").attr('disabled',false);
    }
}