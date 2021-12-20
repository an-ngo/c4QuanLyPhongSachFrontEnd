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
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url: "http://localhost:8087/books/customer/" + id,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content +=
                    '<div style="display:flex;border: 1px solid black;align-items: center;padding: 10px;border-radius: 10px;margin-bottom: 10px">\n' +
                    '                                <div id="leftSidebar" style="width: 938px;text-align: left">\n' +
                    '                                    <h3>' + data[i].name + '</h3>\n' +
                    '                                    <h5 style="font-weight:unset" >' + data[i].type.name + '</h5>\n' +
                    '                                </div>\n' +
                    '                                <div id="rightSidebar">\n' +
                    '                                    <button value="' + data[i].id + '" onclick="putBookIntoBookshelf(this)" class="btn btn-primary">Cất vào kệ</button>\n' +
                    '                                </div>\n' +
                    '                            </div>';
            }
            document.getElementById("modal-body").innerHTML = content;
        }
    });
}

function putBookIntoBookshelf(a) {
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
        type: "PUT",
        url: "http://localhost:8087/books/" + customerId + "/" + bookShelfId + "/" + bookId,
        success: function () {
            findAllBook();
            showAllBookByLocationBookIdAndCustomerId();
            alert("Thực hiện cất sách thành công!")
        },
        error: function () {
            alert("Kệ sách đã đầy, vui lòng chọn kệ khác!");
        }
    });
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
            alert("Thực hiện lấy sách thành công!")
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
        type: "GET",
        url: "http://localhost:8087/locationBooks/" + locationBookId,
        success: function (data) {
            let content1 = '<input id="bookshelfId" type="hidden" value="' + data.id + '"/>'
            document.getElementById("showBookshelfId").innerHTML = content1;
            localStorage.removeItem("bookshelfId");
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
                content += '              <div style="border: 1px solid whitesmoke;width:379.99px; background-color: white">\n' +
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
                    '                <div class="u-social-icons u-spacing-10 u-social-icons-1">\n' +
                    '                  <a class="u-social-url" target="_blank" href=""><span class="u-icon u-icon-circle u-social-facebook u-social-icon u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xlink:href="#svg-ad72"></use></svg><svg x="0px" y="0px" viewBox="0 0 112 112" id="svg-ad72" class="u-svg-content"><path d="M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2 c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z"></path></svg></span>\n' +
                    '                  </a>\n' +
                    '                  <a class="u-social-url" target="_blank" href=""><span class="u-icon u-icon-circle u-social-icon u-social-twitter u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xlink:href="#svg-f916"></use></svg><svg x="0px" y="0px" viewBox="0 0 112 112" id="svg-f916" class="u-svg-content"><path d="M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2 c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7 c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2 c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5 c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z"></path></svg></span>\n' +
                    '                  </a>\n' +
                    '                  <a class="u-social-url" target="_blank" href=""><span class="u-icon u-icon-circle u-social-icon u-social-instagram u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xlink:href="#svg-a0a0"></use></svg><svg x="0px" y="0px" viewBox="0 0 112 112" id="svg-a0a0" class="u-svg-content"><path d="M55.9,32.9c-12.8,0-23.2,10.4-23.2,23.2s10.4,23.2,23.2,23.2s23.2-10.4,23.2-23.2S68.7,32.9,55.9,32.9z M55.9,69.4c-7.4,0-13.3-6-13.3-13.3c-0.1-7.4,6-13.3,13.3-13.3s13.3,6,13.3,13.3C69.3,63.5,63.3,69.4,55.9,69.4z"></path><path d="M79.7,26.8c-3,0-5.4,2.5-5.4,5.4s2.5,5.4,5.4,5.4c3,0,5.4-2.5,5.4-5.4S82.7,26.8,79.7,26.8z"></path><path d="M78.2,11H33.5C21,11,10.8,21.3,10.8,33.7v44.7c0,12.6,10.2,22.8,22.7,22.8h44.7c12.6,0,22.7-10.2,22.7-22.7 V33.7C100.8,21.1,90.6,11,78.2,11z M91,78.4c0,7.1-5.8,12.8-12.8,12.8H33.5c-7.1,0-12.8-5.8-12.8-12.8V33.7 c0-7.1,5.8-12.8,12.8-12.8h44.7c7.1,0,12.8,5.8,12.8,12.8V78.4z"></path></svg></span>\n' +
                    '                  </a>\n' +
                    '                  <a class="u-social-url" target="_blank" href="#"><span class="u-icon u-icon-circle u-social-icon u-social-linkedin u-icon-4"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xlink:href="#svg-78e1"></use></svg><svg x="0px" y="0px" viewBox="0 0 112 112" id="svg-78e1" class="u-svg-content"><path d="M33.8,96.8H14.5v-58h19.3V96.8z M24.1,30.9L24.1,30.9c-6.6,0-10.8-4.5-10.8-10.1c0-5.8,4.3-10.1,10.9-10.1 S34.9,15,35.1,20.8C35.1,26.4,30.8,30.9,24.1,30.9z M103.3,96.8H84.1v-31c0-7.8-2.7-13.1-9.8-13.1c-5.3,0-8.5,3.6-9.9,7.1 c-0.6,1.3-0.6,3-0.6,4.8V97H44.5c0,0,0.3-52.6,0-58h19.3v8.2c2.6-3.9,7.2-9.6,17.4-9.6c12.7,0,22.2,8.4,22.2,26.1V96.8z"></path></svg></span>\n' +
                    '                  </a>\n' +
                    '                </div>\n' +
                    '              </div>\n';
                // content += '<div>'+data[i].name+'</div>'+
                //  '<div>'+data[i].type.name+'</div>' ;
            }
            document.getElementById("bookList").innerHTML = content;
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
    let newBook = {
        name: bookTitle,
        description: description,
        category: {
            id: category
        },
        publisher: {
            id: publisher
        }
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

