

$(document).ready(function () {
    loadAllEmployeeD()
});

/**
 load all Employee Method
 * */
function loadAllEmployeeD() {
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
 * Search id and name Load Table
 * */
$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#employeeTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
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