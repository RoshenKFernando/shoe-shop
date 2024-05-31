

setUserPanel();

function getOrderCountU() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/back_End/sales/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}


function getCustomerCountU() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/back_End/customer/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}


function getEmployeeCountD() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/back_End/employee/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function setUserPanel() {
    getCustomerCountU().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalCustomers").text(count);
        } else {
            $("#totalCustomers").text("0");
        }
    });


    getOrderCountU().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalSales").text(count);
        } else {
            $("#totalSales").text("0");
        }
    });

    getEmployeeCountD().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalEmployee").text(count);
        } else {
            $("#totalEmployee").text("0");
        }
    });

}