showLocationBookId();
findAllBook();

function findAllBook() {
    let content = '';
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    $.ajax({

    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type:"GET",
    url:"http://localhost:8087/books/customer/"+id,
    success:function (data){
    for (let i = 0; i < data.length; i++) {
    content +=
    '<div style="display:flex;border: 1px solid black;align-items: center;padding: 10px;border-radius: 10px;margin-bottom: 10px">\n' +
    '                                <div id="leftSidebar" style="width: 938px;text-align: left">\n' +
    '                                    <h3>'+data[i].name+'</h3>\n' +
    '                                    <h5 style="font-weight:unset" >'+data[i].type.name+'</h5>\n' +
    '                                </div>\n' +
    '                                <div id="rightSidebar">\n' +
    '                                    <button value="'+data[i].id+'" onclick="putBookIntoBookshelf(this)" class="btn btn-primary">Cất vào kệ</button>\n' +
    '                                </div>\n' +
    '                            </div>';
    }
    content+='<div id="alert__location"></div>'
    document.getElementById("modal-body").innerHTML = content;
}
});
}
    function putBookIntoBookshelf(a){
    let bookShelfId = $("#bookshelfId").val();
    let data = JSON.parse(localStorage.getItem("data"));
    let customerId = data.idCustomer;
    let bookId = a.getAttribute("value");
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin': '*'
},
    type:"PUT",
    url:"http://localhost:8087/books/"+customerId+"/"+bookShelfId+"/"+bookId,
    success:function (){
        notification1()
        findAllBook();
    showAllBookByLocationBookIdAndCustomerId();
},
    error: function (){
        document.getElementById("alert__location").innerHTML = '<div class="alert alert-danger" role="alert">\n' +
            '  <h4 class="alert-heading">Có Lỗi Xảy Ra!</h4>\n' +
            '  <p> Oops. Có vẻ như kệ đã hết chỗ để sách. Bạn phải lấy một vài quyển sách ra trước khi thêm lại sách.</p>\n' +
            '  <hr>\n' +
            '  <p class="mb-0">Whenever you need to do, books always by your side.</p>\n' +
            '</div>';
        setTimeout(function (){
            document.getElementById("alert__location").innerHTML = '';
        },4000)
    // alert("Kệ sách đã đầy, vui lòng chọn kệ khác!");
}
});
}

                         // thông báo cất sách
function notification1(){
    const myTimeout = setTimeout(closeThis, 4000);
    let content = `
                <!-- Danger Alert Message -->
                <div class="container p-5" id="cha">
<div class="row no-gutters">
<div class="col-lg-5 col-md-12">
<div class="alert alert-success fade show" role="alert" style="    left: -315px;
    top: 50px;">
<button id="close__button" type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeThis()">
<span aria-hidden="True">&times;</span>
</button>
<h4 class="alert-heading">Success!</h4>
<p>Successfully put away books.</p>
</div>
</div>
</div>
</div>`
    document.getElementById("note1").innerHTML = content
}
function closeThis(){
    document.getElementById("cha").style.display = "none";
}


// thông bảo cất sách vào giỏ hàng
function notification2(){
    const myTimeout = setTimeout(closeThis, 4000);
    let content = `
                <!-- Danger Alert Message -->
                <div class="container p-5" id="cha">
<div class="row no-gutters">
<div class="col-lg-5 col-md-12">
<div class="alert alert-success fade show" role="alert" style="    left: -315px;
    top: 50px;">
<button id="close__button" type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeThis()">
<span aria-hidden="True">&times;</span>
</button>
<h4 class="alert-heading">Success!</h4>
<p>Successfully put the book in the basket.</p>
</div>
</div>
</div>
</div>`
    document.getElementById("note2").innerHTML = content
}



function returnBookComeToCart(a) {
    let bookShelfId = $("#bookshelfId").val();
    let data = JSON.parse(localStorage.getItem("data"));
    let customerId = data.idCustomer;
    let bookId = a.getAttribute("value");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "DELETE",
        url: "http://localhost:8087/books/" + customerId + "/" + bookShelfId + "/" + bookId,
        success: function () {
            showAllBookByLocationBookIdAndCustomerId();
            notification2()
        }

    });
}

function showLocationBookId() {
    let locationBookId = JSON.parse(localStorage.getItem("bookshelfId"));
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin': '*'
},
    type:"GET",
    url:"http://localhost:8087/locationBooks/"+locationBookId,
    success:function (data){
    let content1 = '<input id="bookshelfId" type="hidden" value="'+data.id+'"/>'
    document.getElementById("showBookshelfId").innerHTML = content1;
    // localStorage.removeItem("bookshelfId");
    showAllBookByLocationBookIdAndCustomerId()
}
})
}

//list book cua bookShelf
function showAllBookByLocationBookIdAndCustomerId() {
    let locationBookId = $("#bookshelfId").val();
    let data = JSON.parse(localStorage.getItem("data"));
    let customerId = data.idCustomer;
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin': '*'
},
    type: "GET",
    url: "http://localhost:8087/books/" + locationBookId + "/" + customerId,
    success: function (data) {
    let content = '';
    for (let i = 0; i < data.length; i++) {
    content += `<div style="border: 1px solid brown;width:379.99px; background-color: white" id="book-${i}">\n` +
    '                <img style="margin-top: 20px" alt="" class="u-image u-image-default u-image-1" data-image-width="404" data-image-height="404" src="../customer/img/' + data[i].image + '">\n' +
    // '                <img style="margin-top: 20px" alt="" class="u-image u-image-default u-image-1" data-image-width="404" data-image-height="404" src="'+'../customer/img'+data[i].image+'">\n' +
    '                <h3 style="color: black" class="u-align-center u-custom-font u-font-oswald u-text u-text-2">' + data[i].name + '</h3>\n' +
    '                <p class="u-align-center u-text u-text-palette-3-base u-text-3">' + data[i].type.name + '</p>\n' +
    // '                <input type="hidden" id="bookId" value="'+data[i].id+'"></input>\n' +
    '                <div style="display: flex">\n' +

    // '                  <button  class="u-border-2 u-border-black u-btn u-button-style u-hover-black u-none u-text-black u-text-hover-white u-btn-1" onclick="viewBook(this)" value="' + data[i].id + '" >view</button>\n' +
    // '                  <button style="margin-right: 40px;"  class="u-border-2 u-border-black u-btn u-button-style u-hover-black u-none u-text-black u-text-hover-white u-btn-1" value="' + data[i].id + '" onclick="returnBookComeToCart(this)" >remove</button>\n' +

    '                  <button  class="u-border-2 u-border-black u-btn u-button-style u-hover-black u-none u-text-black u-text-hover-white u-btn-1" onclick="viewBook(this)" value="' + data[i].id + '" data-bs-toggle="modal" data-bs-target="#exampleModal1">view</button>\n' +
    '                  <button style="margin-right: 40px;"  class="u-border-2 u-border-black u-btn u-button-style u-hover-black u-none u-text-black u-text-hover-white u-btn-1" value="' + data[i].id + '" onclick="returnBookComeToCart(this)" >remove</button>\n' +

    '                </div>\n' +

        `<form><div id="rating-${i}" class="mt-3 mb-2">
    <input type="radio" id="star5-${i}" name="rating" value="5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class = "full" for="star5-${i}" title="Awesome - 5 stars"></label>
    
    <input type="radio" id="star4half-${i}" name="rating" value="4.5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class="half" for="star4half-${i}" title="Pretty good - 4.5 stars"></label>
    
    <input type="radio" id="star4-${i}" name="rating" value="4" onclick="click_rate(this,`+data[i].id+`)" />
    <label class = "full" for="star4-${i}" title="Pretty good - 4 stars"></label>
    
    <input type="radio" id="star3half-${i}" name="rating" value="3.5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class="half" for="star3half-${i}" title="Meh - 3.5 stars"></label>
    
    <input type="radio" id="star3-${i}" name="rating" value="3" onclick="click_rate(this,`+data[i].id+`)" />
    <label class = "full" for="star3-${i}" title="Meh - 3 stars"></label>
    
    <input type="radio" id="star2half-${i}" name="rating" value="2.5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class="half" for="star2half-${i}" title="Kinda bad - 2.5 stars"></label>
    
    <input type="radio" id="star2-${i}" name="rating" value="2" onclick="click_rate(this,`+data[i].id+`)" />
    <label class = "full" for="star2-${i}" title="Kinda bad - 2 stars"></label>
    
    <input type="radio" id="star1half-${i}" name="rating" value="1.5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class="half" for="star1half-${i}" title="Meh - 1.5 stars"></label>
    
    <input type="radio" id="star1-${i}" name="rating" value="1" onclick="click_rate(this,`+data[i].id+`)" />
    <label class = "full" for="star1-${i}" title="Sucks big time - 1 star"></label>
    
    <input type="radio" id="star0half-${i}" name="rating" value="0.5" onclick="click_rate(this,`+data[i].id+`)" />
    <label class="half" for="star0half-${i}" title="Sucks big time - 0.5 stars"></label>
</div></form>`+
    '              </div>\n';
        

    // content += '<div>'+data[i].name+'</div>'+
    //  '<div>'+data[i].type.name+'</div>' ;
}
    document.getElementById("bookList").innerHTML = content;
    for(let i=0;i<data.length;i++){
        calcRate(data[i].rate,i);
    }
}
});
}

function viewBook(a) {
    let id = a.getAttribute("value")
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/books/" + id,
        success: function (data) {
            let content = `
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Book Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="col-md-12">
                    <label class="labels">Book Title</label>
                    <input type="text" class="form-control" value="${data.name}" >
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Category</label>
                    <input type="text" class="form-control" value="${data.type?.name}" >
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Publisher</label>
                    <input type="text" class="form-control" value="${data.publisher?.name}" >
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Description</label>
                    <input type="text" class="form-control" value="${data.description}" >
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Rating</label>
                    <input type="text" class="form-control" value="${data.rate}">
                    </div>
                    <div class="col-md-12">
                        
                    </div>
                  </div>
                  <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="showEditBook(this)" value="${data.id}" data-bs-toggle="modal" data-bs-target="#exampleModal3">Edit</button>
                  </div>
                </div>
              </div>
        </div>`

            document.getElementById("viewBook").innerHTML = content;
        }
    });

}


function showEditBook(a) {
    let id = a.getAttribute("value");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/books/" + id,
        success: function (data) {
            showAllPublisher()
            showAllType()
            let content = `
        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Book Edit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="col-md-12">
                    <label class="labels">Book Title</label>
                    <input type="text" class="form-control" value="${data.name}" id="bookTitleEdit" >
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Category</label>
                    <select id="categoryEdit" class="form-control" >${data.type?.name}</select>
                    </div>
                    <div class="col-md-12">
                    <label class="labels" >Publisher</label>
                    <select id="publisherEdit" class="form-control" >${data.publisher?.name}</select>
                    </div>
                    <div class="col-md-12">
                    <label class="labels">Description</label>
                    <input type="text" class="form-control" value="${data.description}" id="descriptionEdit">
                    </div>
                    <div class="col-md-12" style="display: none">
                    <label class="labels">rate</label>
                    <input type="text" class="form-control" value="${data.rate}" id="rateEdit">
                    </div>
                  </div>
                  <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editBook(this)" value="${data.id}">Edit</button>
                  </div>
                </div>
              </div>
        </div>`

            document.getElementById("showEditBook").innerHTML = content;
        }
    })
}

function editBook(a) {
    let id = a.getAttribute("value")
    let bookTitle = $('#bookTitleEdit').val()
    let category = $('#categoryEdit').val()
    let publisher = $('#publisherEdit').val()
    let description = $('#descriptionEdit').val()
    let rate = $('#rateEdit').val()
    let newBook = {
        name: bookTitle,
        description: description,
        category: {
            id: category
        },
        publisher: {
            id: publisher
        },
        rate: rate
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        data: JSON.stringify(newBook),
        type: "PUT",
        url: "http://localhost:8087/books/" + id,
        success: function (){
            alert("sadsadsa")
        }
    })

}

// showAll publisher
function showAllPublisher() {
    let content = '';
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/publishers",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += '<option value="' + data[i].id + '">' + data[i].name + '</option>'

            }
            document.getElementById("publisherEdit").innerHTML = content;
        }
    });
}

//showAll types
function showAllType() {
    let content = '';
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/types",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            }
            document.getElementById("categoryEdit").innerHTML = content;
        }

    });
}

function logout() {
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href = "../login-logout/login.html"
}

