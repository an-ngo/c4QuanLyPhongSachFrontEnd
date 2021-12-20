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
          console.log(data)
          let content2 = '<img src="../../customer/img/'+data.avatar+'" style="width: 100%;height: 100%;border-radius: 100px;border: 1px solid white; alt=""/>'
      document.getElementById("money__button").innerHTML = `$${data.money}.00`;
      document.getElementById("name__button").innerHTML = `${data.name}`;
      document.getElementById("image__button").innerHTML = content2;

    },
    })
  }
  getNameAndMoney();