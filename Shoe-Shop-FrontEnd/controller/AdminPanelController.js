
$(document).ready(function () {
    setAdminPanel();
});


function getAdminPanel() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url:  "http://localhost:8080/back_End/api/v1/panel/getAll",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function getOrderCount() {
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

function getItemCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/back_End/item/total",
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

function getCustomerCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url:"http://localhost:8080/back_End/customer/total",
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

function getEmployeeCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url:"http://localhost:8080/back_End/employee/total",
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

function searchItem(code) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url:"http://localhost:8080/back_End/item/searchItemId?code=" + code,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function setAdminPanel() {
    getAdminPanel().then(function (value) {
        if (Object.keys(value).length !== 0) {
            searchItem(value.mostSaleItem).then(function (itm) {
                if (Object.keys(itm).length !== 0) {
                    $("#panelImg").attr('src', value.itemPicture);
                    $("#dashItemCode").text(value.mostSaleItem);
                    $("#dashItemDesc").text(itm.name);
                    $("#dashItemSale").text("$" + itm.salePrice);
                    $("#dashItemQTY").text(value.mostSaleItemQuantity);

                    $("#totalSales").text("$" + value.totalSales);
                    $("#totalProfit").text("$" + value.totalProfit);

                    getOrderCount().then(function (count) {
                        $("#totalSales").text(count);
                    });
                }
            });
        } else {
            $("#panelImg").attr('src', "../assets/img/file.gif");
            $("#dashItemCode").text("");
            $("#dashItemDesc").text("");
            $("#dashItemSale").text("");
            $("#dashItemQTY").text("");

            $("#totalSales").text("$0.00");
            $("#totalProfit").text("$0.00");
            $("#totalSales").text(0);
        }
    });

    getCustomerCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalCustomers").text(count);
        } else {
            $("#totalCustomers").text("0");
        }
    });

    getItemCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalItems").text(count);
        } else {
            $("#totalItems").text("0");
        }
    });

    getOrderCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalSales").text(count);
        } else {
            $("#totalSales").text("0");
        }
    });

    getEmployeeCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalEmployee").text(count);
        } else {
            $("#totalEmployee").text("0");
        }
    });
}
