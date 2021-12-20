
    // getDataOnload()
    showAllBookshelfByRoomId()
    function logout() {
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href = "../login-logout/login.html"
}

    function openViewBookshelf(a) {
    let id = a.getAttribute("id");
    localStorage.setItem("bookshelfId", JSON.stringify(id));
    window.location.href = "../bookshelf/Books.html"
}

    // function getDataOnload() {
    //     let roomId = JSON.parse(localStorage.getItem("roomID"));
    //     let alo = '';
    //     //    alo += '<input id="roomId" type="hidden" value="'+roomId+'"/>';
    //     // document.getElementById("showRoomId").innerHTML = alo;
    //     // showAllBookshelfByRoomId()
    //     $.ajax({
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
    //             'Access-control-allow-origin': '*'
    //         },
    //         type: "GET",
    //         url: "http://localhost:8087/rooms/" + roomId,
    //         success:function (data){
    //                alo += '<input id="roomId" type="hidden" value="'+data.id+'"/>';
    //             document.getElementById("showRoomId").innerHTML = alo;
    //             localStorage.removeItem("roomID")
    //             showAllBookshelfByRoomId()
    //         }
    //     })
    // }

    function showAllBookshelfByRoomId() {
        let current = 0;
        // let roomId = $("#roomId").val();
        let roomId = JSON.parse(localStorage.getItem("roomID"));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("data")).jwttoken,
                'Access-control-allow-origin': '*'
            },
            type: "GET",
            url: "http://localhost:8087/locationBooks/room/" + roomId,
            success: function (data) {
                // localStorage.removeItem("roomID")
                let content = '';
                for (let i = 0; i < data.length; i++) {

                    content += '<section class="u-black u-clearfix u-section-2" id="sec-0694">\n' +
                        '    <div class="u-clearfix u-sheet u-valign-middle-lg u-sheet-1"><!--product--><!--product_options_json-->\n' +
                        '        <!--{"source":""}--><!--/product_options_json--><!--product_item-->\n' +
                        '        <div class="u-container-style u-expanded-width u-product u-product-1">\n' +
                        '            <div class="u-container-layout u-container-layout-1">\n' +
                        '                <div class="u-align-left u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-shape-rectangle u-group-1"\n' +
                        '                     data-animation-name="slideIn" data-animation-duration="2000" data-animation-direction="Right">\n' +
                        '                    <div class="u-container-layout u-container-layout-2">\n' +
                        '                        <h4 class="u-text u-text-default u-text-1">' + data[i].name + '</h4>\n' +
                        '                        <h4 class="u-text u-text-default u-text-palette-2-light-1 u-text-2">\n' +
                        '                            <span style="font-weight: 700;" class="u-text-palette-2-base"></span>\n' +
                        '                        </h4><!--product_button--><!--options_json-->\n' +
                        '                        <!--{"clickType":"add-to-cart","content":"buy&nbsp;"}--><!--/options_json-->\n' +
                        '                        <a href="https://nicepage.one"\n' +
                        '                           class="u-border-2 u-border-palette-2-base u-btn u-button-style u-hover-black u-palette-2-base u-product-control u-text-black u-text-hover-white u-btn-1">\n' +
                        '                            <!--product_button_content-->buy&nbsp;<!--/product_button_content--></a>\n' +
                        '                        <!--/product_button--><!--product_button--><!--options_json-->\n' +
                        '                        <!--{"clickType":"add-to-cart","content":"OPEN"}--><!--/options_json-->\n' +
                        '\n' +
                        '<!--                        button open-->\n' +
                        '                        <a id="' + data[i].id + '"  onclick="openViewBookshelf(this)"\n' +
                        '                           class="u-border-none u-btn u-button-style u-hover-palette-1-dark-1 u-palette-5-light-3 u-product-control u-btn-2">\n' +
                        '                            OPEN<!--/product_button_content--></a><!--/product_button-->\n' +
                        '                        <a href="https://nicepage.com/k/astrology-website-templates"\n' +
                        '                           class="u-btn u-button-style u-none u-text-palette-2-base u-btn-3"><i class="fas fa-book"></i> ' + data[i].current + '/' + data[i].capacity +
                        '                        </a>\n' +
                        '                        <div class="u-social-icons u-spacing-40 u-social-icons-1">\n' +
                        '                            <a class="u-social-url" target="_blank" href=""><span\n' +
                        '                                    class="u-icon u-icon-circle u-social-facebook u-social-icon u-icon-2"><svg\n' +
                        '                                    class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112"\n' +
                        '                                    style=""><use xlink:href="#svg-bfbd"></use></svg><svg\n' +
                        '                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
                        '                                    version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 112 112"\n' +
                        '                                    x="0px" y="0px" id="svg-bfbd"><path d="M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2 c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z"></path></svg></span>\n' +
                        '                            </a>\n' +
                        '                            <a class="u-social-url" target="_blank" href=""><span\n' +
                        '                                    class="u-icon u-icon-circle u-social-icon u-social-twitter u-icon-3"><svg\n' +
                        '                                    class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112"\n' +
                        '                                    style=""><use xlink:href="#svg-2dfc"></use></svg><svg\n' +
                        '                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
                        '                                    version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 112 112"\n' +
                        '                                    x="0px" y="0px" id="svg-2dfc"><path d="M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2 c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7 c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2 c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5 c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z"></path></svg></span>\n' +
                        '                            </a>\n' +
                        '                            <a class="u-social-url" target="_blank" href=""><span\n' +
                        '                                    class="u-icon u-icon-circle u-social-icon u-social-instagram u-icon-4"><svg\n' +
                        '                                    class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112"\n' +
                        '                                    style=""><use xlink:href="#svg-8b43"></use></svg><svg\n' +
                        '                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
                        '                                    version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 112 112"\n' +
                        '                                    x="0px" y="0px" id="svg-8b43"><path d="M55.9,32.9c-12.8,0-23.2,10.4-23.2,23.2s10.4,23.2,23.2,23.2s23.2-10.4,23.2-23.2S68.7,32.9,55.9,32.9z M55.9,69.4c-7.4,0-13.3-6-13.3-13.3c-0.1-7.4,6-13.3,13.3-13.3s13.3,6,13.3,13.3C69.3,63.5,63.3,69.4,55.9,69.4z"></path><path\n' +
                        '                                    d="M79.7,26.8c-3,0-5.4,2.5-5.4,5.4s2.5,5.4,5.4,5.4c3,0,5.4-2.5,5.4-5.4S82.7,26.8,79.7,26.8z"></path><path\n' +
                        '                                    d="M78.2,11H33.5C21,11,10.8,21.3,10.8,33.7v44.7c0,12.6,10.2,22.8,22.7,22.8h44.7c12.6,0,22.7-10.2,22.7-22.7 V33.7C100.8,21.1,90.6,11,78.2,11z M91,78.4c0,7.1-5.8,12.8-12.8,12.8H33.5c-7.1,0-12.8-5.8-12.8-12.8V33.7 c0-7.1,5.8-12.8,12.8-12.8h44.7c7.1,0,12.8,5.8,12.8,12.8V78.4z"></path></svg></span>\n' +
                        '                            </a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div><!--product_image-->\n' +
                        '                <img alt="" class="u-image u-image-default u-product-control u-image-1"\n' +
                        '                     src="images/' + data[i].image + '"\n' +
                        '                     data-image-width="1280" data-image-height="878"><!--/product_image-->\n' +
                        '            </div>\n' +
                        '        </div><!--/product_item--><!--/product-->\n' +
                        '    </div>\n' +
                        '</section>'
                    document.getElementById("bookshelfs").innerHTML = content;
                }
            }
        });
    }
