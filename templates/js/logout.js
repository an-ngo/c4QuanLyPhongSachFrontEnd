document.getElementById("logout__button").addEventListener("click", logout);

function logout(){
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href="../login-logout/login.html"
}

// mua room
function buyRoom(name,price,image) {
    let money = getMoneyCustomer()
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let newRoom = {
        name: name,
        price: price,
        image: image,
        customer: {
            id:id
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "POST",
        url: "http://localhost:8087/rooms/" + id,
        data: JSON.stringify(newRoom),
        success: function () {
            window.location.href ="../My Room/List-Room.html"
        }
    });
    event.preventDefault();
}

function getMoneyCustomer(){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/customers/" + JSON.parse(localStorage.getItem("data")).idCustomer,
        success: function (customer) {
            return customer.money;
        }
    });
}