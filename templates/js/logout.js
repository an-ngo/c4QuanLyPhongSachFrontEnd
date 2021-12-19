document.getElementById("logout__button").addEventListener("click", logout);

function logout(){
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href="../login-logout/login.html"
}

// mua room
function buyRoom(name,price,image) {
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
        },
        error: not_enough_money
    });
    event.preventDefault();
}


function not_enough_money(){
let content = `
                <!-- Danger Alert Message -->
                <div class="container p-5" id="cha">
<div class="row no-gutters">
<div class="col-lg-5 col-md-12">
<div class="alert alert-success fade show" role="alert" style="    left: -350px;
    top: 50px;">
<button id="close__button" type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closethis()">
<span aria-hidden="True">&times;</span>
</button>
<h4 class="alert-heading">Warning!</h4>
<p>The balance in the account is not enough to make this transaction. Please recharge to use.</p>
</div>
</div>
</div>
</div>`
    document.getElementById("long").innerHTML = content
}

function closethis(){
    document.getElementById("cha").style.display = "none";
}

const myTimeout = setTimeout(closethis, 4000);
