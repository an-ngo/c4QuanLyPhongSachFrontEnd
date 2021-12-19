function getNameAndMoney(){
    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
        'Access-control-allow-origin': '*'
    },
    type: "GET",
    url: "http://localhost:8087/customers/" + JSON.parse(localStorage.getItem("data")).idCustomer,
    success: function (data) {
      document.getElementById("money__button").innerHTML = `$${data.money}.00`;
      document.getElementById("name__button").innerHTML = `${data.name}`;

    },
    })
  }
  getNameAndMoney();