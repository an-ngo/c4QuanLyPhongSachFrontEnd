successHandler();

        function updateForm(smartphoneId) {
            let newSmartphone = {
                id: -1,
                producer: "",
                model: "",
                price: ""
            };
            if (smartphoneId === -1) {
                smartphoneId = "";
            }
            $.ajax({
                type: "GET",
                url: `/smartphones/${smartphoneId}`,
                success: function (data) {
                    if (smartphoneId === "") {
                        data = newSmartphone;
                    }
                    document.getElementById('form-smartphone').innerHTML = form(data);
                }
            });
            event.preventDefault();
        }

        function form(smartphone) {
            return `<table>
                        <tr>
                            <td>Producer:</td>
                            <td><input type="text" id="producer" value="${smartphone.producer}"></td>
                        </tr>
                        <tr>
                            <td>Model:</td>
                            <td><input type="text" id="model" value="${smartphone.model}"></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><input type="text" id="price" value="${smartphone.price}"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Submit" onclick="addOrUpdate(${smartphone.id})"></td>
                        </tr>
                     </table>`;
        }

        function addOrUpdate(smartphoneId) {
            let producer = $('#producer').val();
            let model = $('#model').val();
            let price = $('#price').val();
            if (smartphoneId !== -1) {
                let smartphone = {
                    id: smartphoneId,
                    producer: producer,
                    model: model,
                    price: price
                };
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "PUT",
                    data: JSON.stringify(smartphone),
                    url: `/smartphones/${smartphoneId}`,
                    success: function () {
                        alert("Update Success")
                    }
                })
            } else {
                let smartphone = {
                    producer: producer,
                    model: model,
                    price: price
                };
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    data: JSON.stringify(smartphone),
                    url: "/smartphones",
                    success: function () {
                        alert("Create Success")
                    }
                });
            }
            event.preventDefault();
        }

        function getSmartphone(smartphone) {
            return `<tr>
                        <td >${smartphone.producer}</td>
                        <td >${smartphone.model}</td>
                        <td >${smartphone.price}</td>` +
                `       <td><button onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
                        <td><button onclick="updateForm(${smartphone.id})">Update</button></td>
                    </tr>`;
        }

        function deleteSmartphone(smartphoneId) {
            $.ajax({
                type: "DELETE",
                url: `/smartphones/${smartphoneId}`,
                success: successHandler
            });
        }

        function successHandler() {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                },
                type: "GET",
                url: "/smartphones",
                success: function (data) {
                    let content = '    <tr>\n' +
                        '        <td>Producer</td>\n' +
                        '        <td>Model</td>\n' +
                        '        <td>Price</td>\n' +
                        '        <td>Delete</td>\n' +
                        '    </tr>';
                    for (let i = 0; i < data.content.length; i++) {
                        content += getSmartphone(data.content[i]);
                    }
                    document.getElementById('smartphoneList').innerHTML = content;
                }
            });
        }

        function searchProducer() {
            let search = $('#q').val();
            $.ajax({
                type: "Get",
                //tên API
                url: `/smartphones?q=${search}`,
                success: function (data) {
                    let content = '    <tr>\n' +
                        '        <td>Producer</td>\n' +
                        '        <td>Model</td>\n' +
                        '        <td>Price</td>\n' +
                        '        <td>Delete</td>\n' +
                        '    </tr>';
                    for (let i = 0; i < data.content.length; i++) {
                        content += getSmartphone(data.content[i]);
                    }
                    document.getElementById('smartphoneList').innerHTML = content;
                }
            });
            event.preventDefault();
        }

        let page = 0;

        function nextPage() {
            page++;
            $.ajax({
                type: "GET",
                url: `/smartphones?page=${page}`,
                success: function (data) {
                    let content = '    <tr>\n' +
                        '        <td>Producer</td>\n' +
                        '        <td>Model</td>\n' +
                        '        <td>Price</td>\n' +
                        '        <td>Delete</td>\n' +
                        '    </tr>';
                    for (let i = 0; i < data.content.length; i++) {
                        content += getSmartphone(data.content[i]);
                    }
                    document.getElementById('smartphoneList').innerHTML = content;
                }
            });
            event.preventDefault();
        }

        function luiPage() {
            if (page > 0) {
                page--;
            }
            $.ajax({
                type: "GET",
                //tên API
                url: `/smartphones?page=${page}`,
                success: function (data) {
                    let content = '    <tr>\n' +
                        '        <td>Producer</td>\n' +
                        '        <td>Model</td>\n' +
                        '        <td>Price</td>\n' +
                        '        <td>Delete</td>\n' +
                        '    </tr>';
                    for (let i = 0; i < data.content.length; i++) {
                        content += getSmartphone(data.content[i]);
                    }
                    document.getElementById('smartphoneList').innerHTML = content;
                }
            });
            event.preventDefault();
        }
