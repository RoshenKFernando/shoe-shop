

$(document).ready(function (){
    loadAllItem();
});

/**
 * clear input fields Values Method
 * */
function setTextFieldValueI(code, Name, qty, itemPicture, category, size, supplier, supName, salePrice, buyPrice, expectedProfit, profitMargin, status) {
    $("#item_code").val(code);
    $("#inv_Item_Desc").val(Name);
    $("#inv_qty").val(qty);
    $("#inv_Category").val(category);
    $("#size").val(size);
    $("#inv_Supplier_Code").val(supplier);
    $("#inv_Supplier_name").val(supName);
    $("#inv_Unit_price").val(salePrice);
    $("#unit_price_Buy").val(buyPrice);
    $("#Expected_Profit").val(expectedProfit);
    $("#Profit_margin").val(profitMargin);
    $("#Inv_Status").val(status);
    $("#inv_Item_pic").attr('src'.val(itemPicture));

    $("#item_code").focus();
    $("#btnAddInventory").attr('disabled', false);
    $("#btnUpdateInventory").attr('disabled', false);
    $("#btnDeleteInventory").attr('disabled', false);
}


/**
 * Button Add New Item
 * */
$("#btnAddInventory").click(function () {
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/login.jpg') {
        // Handle error scenario
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item", res.message);
            // calculateExpectedProfit(); // Calculate expected profit after adding item
            loadAllItem();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
        }
    });
});


$("#inv_Supplier_Code").on("keypress", function (event) {
    if (event.which === 13) {
        // Enter key pressed
        var search = $("#inv_Supplier_Code").val();
        fetchSupplierName(search);
    }
});

$("#inv_Supplier_Code").empty();
/*performAuthenticatedRequest();
const accessToken = localStorage.getItem('accessToken');*/
$.ajax({
    url:  "http://localhost:8080/back_End/supplier",
    method: "GET",
    /*headers: {
        'Authorization': 'Bearer ' + accessToken
    },*/
    dataType: "json",
    success: function (res) {
        for (let i of res.data) {
            let code = i.code;
            $("#inv_Supplier_Code").append(`<option>${code}</option>`);
        }
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }
});

$("#inv_Supplier_Code").change(function () {
    var search = $("#inv_Supplier_Code").val();
    fetchSupplierName(search);
});

function fetchSupplierName(code) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier/searchSup?code=" + code,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            $("#inv_Supplier_name").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
            // Optionally, clear the supplier name field if the supplier code is invalid
            $("#inv_Supplier_name").val('');
        }
    });
}



/**
 load all Item Method
 * */
function loadAllItem() {
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
 * Table Listener Click and Load textFields
 * */
function blindClickEventsI() {
    $("#inventoryTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let Name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let supplier = $(this).children().eq(5).text();
        let supName = $(this).children().eq(6).text();
        let salePrice = $(this).children().eq(7).text();
        let buyPrice = $(this).children().eq(8).text();
        let expectedProfit = $(this).children().eq(9).text();
        let profitMargin = $(this).children().eq(10).text();
        let status = $(this).children().eq(11).text();

        setTextFieldValueI(code, Name, qty, "", category, size, supplier, supName, salePrice, buyPrice, expectedProfit, profitMargin, status);
    });

    $("#btnAddInventory").attr('disabled', false);
    $("#btnUpdateInventory").attr('disabled', false);
    $("#btnDeleteInventory").attr('disabled', false);
}


/**
 * Update Item
 * */
$("#btnUpdateInventory").click(function () {
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/login.jpg') {
        // Handle error scenario
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item", res.message);
            loadAllItem();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
        }
    });
});


/**
 * Delete Item
 * */
$("#btnDeleteInventory").click(function () {
    let code = $("#item_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/item?code=" + code,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Item", resp.message);
            loadAllItem();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Item", message);
        }
    });
});

/**
 * set Item Pic
 */
$('#inv_Item_pic').change(function() {
    var fileInput = $('#inv_Item_pic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        $(this).val("");
    } else {
        // Handle error scenario
    }
});


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
                let category = res.category;
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




function profitMargin() {
    let salePrice = parseFloat($("#inv_Unit_price").val());
    let buyPrice = parseFloat($("#unit_price_Buy").val());

    if (!isNaN(salePrice) && !isNaN(buyPrice)) {
        let profit = salePrice - buyPrice;
        let profitMargin = Math.round((profit / salePrice) * 100);
        profitMargin = profitMargin.toFixed(1);
        $("#Expected_Profit").val(profit);
        $("#Profit_margin").val(profitMargin);
    } else {
        $("#Expected_Profit").val('');
        $("#Profit_margin").val('');
    }
}
// Attach an event listener to the buyPrice input field
$("#unit_price_Buy").on("input", function() {
    // Call the profitMargin function
    profitMargin();
});

/**
 * Clear Method
 */
function clearDetails() {
    $('#inv_Item_Desc,#inv_qty,#inv_Category,#size,#inv_Supplier_Code,#inv_Supplier_name,#inv_Unit_price,#unit_price_Buy,#Expected_Profit,#Profit_margin,#Inv_Status,#inv_Item_pic').val("");

}

$("#btnClearItem").click(function () {
    clearDetails();
});


/**
 * Item Validation
 */

$("#item_code").focus();
const regExItemID =  /^[A-z0-9/ ]{3,20}$/;
const regExItemName = /^[A-z ]{3,20}$/;
const regExItemQty = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const regExSupID = /^(S00-)[0-9]{3,4}$/;
const regExItemUnitPriceSale = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const regExItemUnitPriceBuy = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const regExItemStatus = /^[A-z ]{3,20}$/;

let itemValidations = [];
itemValidations.push({
    reg: regExItemID, field: $('#item_code'), error: 'Item ID Pattern is Wrong :A-z 3-20 '
});
itemValidations.push({
    reg: regExItemName, field: $('#inv_Item_Desc'), error: 'Item Name Pattern is Wrong : A-z 3-20'
});

itemValidations.push({
    reg: regExItemQty, field: $('#inv_qty'), error: 'Item Qty is Wrong : Enter Number'
});

itemValidations.push({
    reg: regExSupID, field: $('#inv_Supplier_Code'), error: 'Supplier ID Pattern is Wrong : S00-001'
});
itemValidations.push({
    reg: regExItemUnitPriceSale, field: $('#inv_Unit_price'), error: 'Item Unit Price is Wrong : Enter Number'
});
itemValidations.push({
    reg: regExItemUnitPriceBuy, field: $('#unit_price_Buy'), error: 'Item Price Buy is Wrong : Enter Number'
});
itemValidations.push({
    reg: regExItemStatus, field: $('#Inv_Status'), error: 'Item Status Pattern is Wrong : A-z 3-20'
});

$("#item_code,#inv_Item_Desc,#inv_qty,#inv_Supplier_Code,#inv_Unit_price,#unit_price_Buy,#Inv_Status").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#item_code,#inv_Item_Desc,#inv_qty,#inv_Supplier_Code,#inv_Unit_price,#unit_price_Buy,#Inv_Status").on('keyup', function (event) {
    checkValidity(itemValidations);
});

$("#item_code,#inv_Item_Desc,#inv_qty,#inv_Supplier_Code,#inv_Unit_price,#unit_price_Buy,#Inv_Status").on('blur', function (event) {
    checkValidity(itemValidations);
});


$("#item_code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemID, $("#item_code"))) {
        $("#inv_Item_Desc").focus();
    } else {
        focusText($("#item_code"));
    }
});

$("#inv_Item_Desc").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#inv_Item_Desc"))) {
        focusText($("#inv_qty"));
    }
});

$("#inv_qty").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#inv_qty"))) {
        focusText($("#inv_Category"));
    }
});

$("#inv_Supplier_Code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#inv_Supplier_Code"))) {
        focusText($("#inv_Supplier_name"));
    }
});

$("#inv_Unit_price").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#inv_Unit_price"))) {
        focusText($("#unit_price_Buy"));
    }
});

$("#unit_price_Buy").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#unit_price_Buy"))) {
        focusText($("#Expected_Profit"));
    }
});

$("#Inv_Status").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#Inv_Status"))) {
        focusText($("#btnAddInventory"));
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnAddInventory").attr('disabled', true);
        $("#btnUpdateInventory").attr('disabled', true);
        $("#btnDeleteInventory").attr('disabled', true);
    } else {
        $("#btnAddInventory").attr('disabled', false);
        $("#btnUpdateInventory").attr('disabled', false);
        $("#btnDeleteInventory").attr('disabled',false);
    }
}

