function showEdit() {
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.jwttoken
        },
        type: "GET",
        url: "http://localhost:8087/customers/" + id,
        success: function (customer) {
            $('#idEdit').val(customer.id);
            $('#emailsEdit').val(customer.email);
            $('#passwordEdit').val(customer.password);
            $('#nameEdit').val(customer.name);
            $('#dobEdit').val(customer.dateOfBirth);
            $('#phoneNumberEdit').val(customer.phoneNumber);
            $('#moneyEdit').val(customer.money);
            $('#avatarEdit').val(customer.avatar);
        },
    })
}

function saveCustomer() {
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let email = $('#emailsEdit').val();
    let password = $('#passwordEdit').val();
    let name = $('#nameEdit').val();
    let dob = $('#dobEdit').val();
    let phoneNumber = $('#phoneNumberEdit').val();
    let money = $('#moneyEdit').val();
    let avatar = $('#avatarEdit')[0].files[0];
    let fd = new FormData();
    fd.append("file", avatar);
    let newCustomer = {
        id: id,
        email: email,
        password: password,
        name: name,
        dateOfBirth: dob,
        phoneNumber: phoneNumber,
        money: money
    };
    fd.append("newCustomer", JSON.stringify(newCustomer));
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "PUT",
        enctype: 'multipart/form-data',
        url: "http://localhost:8087/customers/" + id,
        processData: false,
        contentType: false,
        cache: false,
        data: fd,
        success: function () {
            getCustomerInfo()
            document.getElementById("message").innerText = "Successfully updated !"

        }
    });
    event.preventDefault();
}

// Recharge
function inputRecharge() {
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let money = $('#money').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin':'*'
        },
        type: "PUT",
        url: "http://localhost:8087/customers/recharge/" + id + "/" + money,
        success: function (){
            document.getElementById("message-recharge").innerText = "Recharge successful !"
            showEdit()
        }
    })
}

function getCustomerInfo() {
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    $.ajax({
        type: "GET",
        url: "http://localhost:8087/customers/" + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.jwttoken                },
        success: function (data) {
            let avatar = `<img class="rounded-circle mt-5" width="150px" src="../../c4QuanLyPhongSachFrontEnd/customer/img/${data.avatar}">`;
            let name = `${data.name}`;
            document.getElementById('avatar-img').innerHTML = avatar;
            document.getElementById('name-customer').innerHTML = name;
        }
    })
}

function logout(){
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href="../login-logout/login.html"
}

showEdit()
getCustomerInfo()
