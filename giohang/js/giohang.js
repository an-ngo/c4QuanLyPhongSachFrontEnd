
    showCustomerName();
    showCustomerEmail();
    showAllBook();
    showCustomerDateOfBirth()
    showCustomerAvatar()
            showAllPublisher()
            showAllType()
    showCustomerPhoneNumber()


    function showAllBook(){
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
    '<div style="display: flex;height: 235px;margin-bottom: 20px">\n' +
    '                      <div style="width: 235px;height: 235px" id="picture">\n' +
    '                          <img src="../customer/img/'+data[i].image+'" alt="" style="width: 100%;height: 100%">\n' +
    '                      </div>\n' +
    '                      <div style="margin-left: 50px;display: flex;flex-direction: column">\n' +
    '                          <h2 style="text-transform: uppercase;" >'+data[i].name+'</h2>\n' +
    '                          <h5 >'+data[i].type.name+'</h5>\n' +
    '                          <h3></h3>\n' +
    '                          <h3></h3>\n' +
    '                          <div style="margin-top:10px ">\n' +
    '                              <button  class="u-active-white u-border-1 u-border-white u-btn u-button-style u-hover-white u-none u-text-active-palette-5-dark-3 u-text-body-alt-color u-text-hover-palette-5-dark-3 u-btn-3" value="'+data[i].id+'" onclick="">CẤt sách</button>\n' +
    '                              <button  class="u-active-white u-border-1 u-border-white u-btn u-button-style u-hover-white u-none u-text-active-palette-5-dark-3 u-text-body-alt-color u-text-hover-palette-5-dark-3 u-btn-4" value="'+data[i].id+'" onclick="removeBook(this)">Xóa sách</button>\n' +
    '                          </div>\n' +
    '                      </div>\n' +
    '                  </div>';
}
    document.getElementById("bookList").innerHTML = content;
}
});
}
    function showCustomerName(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "GET",
    url: "http://localhost:8087/customers/"+id,
    success:function (data){
    content += '<span>'+data.name+'</span>'
    document.getElementById("customerName").innerHTML = content;
}
});
}
    function showCustomerEmail(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "GET",
    url: "http://localhost:8087/customers/"+id,
    success:function (data){
    content += '<span><i class="fas fa-envelope"></i>  '+data.email+'</span>'
    document.getElementById("customerEmail").innerHTML = content;
}
});
}
    function showCustomerAvatar(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "GET",
    url: "http://localhost:8087/customers/"+id,
    success:function (data){
    content += '<img style="width: 100%;height: 100%;border-radius: 30px" src="'+'../customer/img/'+data.avatar+'" alt=""/>'
    document.getElementById("customerAvatar").innerHTML = content;
}
});
}
    function showCustomerDateOfBirth(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "GET",
    url: "http://localhost:8087/customers/"+id,
    success:function (data){
    content += '<span><i class="fas fa-birthday-cake"></i>  '+data.dateOfBirth+'</span>'
    document.getElementById("customerDateOfBirth").innerHTML = content;
}
});
}
    function showCustomerPhoneNumber(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "GET",
    url: "http://localhost:8087/customers/"+id,
    success:function (data){
    content += '<span><i class="fas fa-phone-alt"></i>  '+data.phoneNumber+'</span>'
    document.getElementById("customerPhoneNumber").innerHTML = content;
}
});
}
    // showAll publisher
    function showAllPublisher(){
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type:"GET",
    url:"http://localhost:8087/publishers",
    success:function (data){
    for (let i = 0; i < data.length; i++) {
    content += '<option value="'+data[i].id+'">'+data[i].name+'</option>'

}
    document.getElementById("publisher").innerHTML = content;
}
});
}

    //showAll types
    function showAllType(){
    let content = '';
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type:"GET",
    url:"http://localhost:8087/types",
    success:function (data){
    for (let i = 0; i < data.length; i++) {
    content += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
}
    document.getElementById("type").innerHTML = content;
}

});
}


    //hiển thị ảnh khi add
    function imagesFileAsURL() {
    let fileSelected = document.getElementById('image').files;
    if (fileSelected.length > 0) {
    let fileToUpload = fileSelected[0];
    let fileReader = new FileReader();
    fileReader.onload = function (fileLoaderEvent) {
    let srcData = fileLoaderEvent.target.result;
    let newImage = document.createElement('img');
    newImage.src = srcData;
    newImage.style.width = "100%";
    document.getElementById('displayImg').innerHTML = newImage.outerHTML;
}
    fileReader.readAsDataURL(fileToUpload)
}
}

    function removeBook(a){
    let id = a.getAttribute("value");
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    type: "DELETE",
    url: "http://localhost:8087/books/"+id,
    success:showAllBook
});
}


    //Add new book vao gio hang
    function addNewBook(){
    let data = JSON.parse(localStorage.getItem("data"));
    let id = data.idCustomer;
    let name = $("#name").val();
    let description = $("#description").val();
    let status = true;
    let customer_id = id;
    let publisher_id = $("#publisher").val();
    let type_id = $("#type").val();
    let images = $("#image")[0].files[0];
    let fd = new FormData();
    fd.append("file",images);
    let book = {
    name:name,
    description:description,
    status:status,
    customer:{
    id:customer_id
},
    publisher:{
    id: publisher_id
},
    type:{
    id:type_id
}
};
    fd.append("newBook", JSON.stringify(book));
    $.ajax({
    headers: {
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("data")).jwttoken,
    'Access-control-allow-origin':'*'
},
    enctype: 'multipart/form-data',
    url: "http://localhost:8087/books",
    processData: false,
    contentType: false,
    cache: false,
    type: "POST",
    data: fd,
    success:function (){
    showAllBook();
    alert("Success!")
}
});
    event.preventDefault();
}

