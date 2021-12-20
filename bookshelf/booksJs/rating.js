function calcRate(r,i) {
    if(r!=0){
        const f = ~~r,//Tương tự Math.floor(r)
        id = 'star' + f + (r % f ? 'half' : '')+'-'+i;
        document.getElementById(id).setAttribute('checked', 'checked');

    }

    
}

function click_rate(e,id_book){
    let rate = parseFloat(e.getAttribute("value"));
    
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
            type: "PUT",
            url: "http://localhost:8087/books/rates/" + id_book,
            data: JSON.stringify(rate)
    });
}