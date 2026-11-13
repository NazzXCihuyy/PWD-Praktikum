var produkList = [
    { id: 1, nama: "Laptop Gaming",       harga: 12500000, stok: 3,  icon: "img/Laptop.jpg" },
    { id: 2, nama: "Smartphone",       harga: 6800000,  stok: 5,  icon: "img/Hp.jpg" },
    { id: 3, nama: "True Wireless Stereo",   harga: 450000,   stok: 10, icon: "img/Tws.jpg" },
    { id: 4, nama: "Keyboard Mechanical",  harga: 750000,   stok: 7,  icon: "img/Keyboard.jpg" },
    { id: 5, nama: "Mouse Ergonomis",      harga: 320000,   stok: 0,  icon: "img/Mouse.jpg" },
    { id: 6, nama: "Monitor 4K 27\"",      harga: 4200000,  stok: 4,  icon: "img/Monitor.jpg" },
    { id: 7, nama: "Webcam HD",            harga: 550000,   stok: 8,  icon: "img/Webcam.jpg" },
    { id: 8, nama: "Flash Drive 64GB",     harga: 120000,   stok: 15, icon: "img/FlashDrive.jpg" }
];

function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderProducts() {
    var container = document.getElementById("productContainer");

    for (var i = 0; i < produkList.length; i++) {
        var p = produkList[i];

        var card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-nama", p.nama.toLowerCase());

        var iconDiv = document.createElement("div");
        iconDiv.className = "product-icon";
        var img = document.createElement("img");
        img.src = p.icon;
        img.alt = p.nama;
        iconDiv.appendChild(img);
        card.appendChild(iconDiv);

        var namaDiv = document.createElement("div");
        namaDiv.className = "product-name";
        namaDiv.appendChild(document.createTextNode(p.nama));
        card.appendChild(namaDiv);

        var hargaDiv = document.createElement("div");
        hargaDiv.className = "product-price";
        hargaDiv.appendChild(document.createTextNode("Rp " + formatRupiah(p.harga)));
        card.appendChild(hargaDiv);

        var stokDiv = document.createElement("div");
        stokDiv.className = "product-stock";
        stokDiv.id = "stok-" + p.id;
        if (p.stok === 0) {
            stokDiv.className += " habis";
            stokDiv.appendChild(document.createTextNode("Stok: Habis"));
        } else {
            stokDiv.appendChild(document.createTextNode("Stok: " + p.stok));
        }
        card.appendChild(stokDiv);

        var btn = document.createElement("button");
        btn.className = "btn-add";
        btn.setAttribute("data-id", p.id);
        btn.appendChild(document.createTextNode("+ Tambah ke Keranjang"));
        if (p.stok === 0) {
            btn.disabled = true;
        }
        card.appendChild(btn);

        container.appendChild(card);
    }
}

renderProducts();

$(document).ready(function() {

    var cart = [];

    function updateCartSummary() {
        var totalItem = cart.length;
        var totalHarga = 0;
        for (var i = 0; i < cart.length; i++) {
            totalHarga += cart[i].harga;
        }

        $("#totalItems").text(totalItem);
        $("#totalPrice").text(formatRupiah(totalHarga));
        $("#cartCount").text(totalItem);

        if (totalItem === 0) {
            $("#emptyMsg").show();
        } else {
            $("#emptyMsg").hide();
        }
    }

    function findProduct(id) {
        for (var i = 0; i < produkList.length; i++) {
            if (produkList[i].id === id) {
                return produkList[i];
            }
        }
        return null;
    }

    function updateStockDisplay(produk) {
        var stokEl = $("#stok-" + produk.id);
        if (produk.stok === 0) {
            stokEl.text("Stok: Habis").addClass("habis");
            $(".btn-add[data-id='" + produk.id + "']").prop("disabled", true);
        } else {
            stokEl.text("Stok: " + produk.stok).removeClass("habis");
            $(".btn-add[data-id='" + produk.id + "']").prop("disabled", false);
        }
    }

    $(document).on("click", ".btn-add", function() {
        var productId = parseInt($(this).attr("data-id"));
        var produk = findProduct(productId);

        if (produk.stok <= 0) {
            alert("Maaf, stok \"" + produk.nama + "\" sudah habis!");
            return;
        }

        produk.stok--;
        updateStockDisplay(produk);

        var cartItemId = "cart-" + Date.now();

        cart.push({
            cartItemId: cartItemId,
            id: produk.id,
            nama: produk.nama,
            harga: produk.harga
        });

        var li = '<li id="' + cartItemId + '">' +
                    '<div class="item-info">' +
                        '<div class="item-name">' + produk.nama + '</div>' +
                        '<div class="item-price">Rp ' + formatRupiah(produk.harga) + '</div>' +
                    '</div>' +
                    '<button class="btn-remove" data-cart-id="' + cartItemId + '" data-product-id="' + produk.id + '">Hapus</button>' +
                 '</li>';

        $("#cartList").append(li);

        $("#" + cartItemId).fadeIn(400);

        updateCartSummary();

        if ($("#cartPanel").is(":hidden")) {
            $("#cartPanel").fadeToggle(400);
        }
    });

    $(document).on("click", ".btn-remove", function() {
        var cartId = $(this).attr("data-cart-id");
        var productId = parseInt($(this).attr("data-product-id"));

        if (!confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
            return;
        }

        $("#" + cartId).fadeOut(400, function() {
            $(this).remove();
        });

        var produk = findProduct(productId);
        if (produk) {
            produk.stok++;
            updateStockDisplay(produk);
        }

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].cartItemId === cartId) {
                cart.splice(i, 1);
                break;
            }
        }

        updateCartSummary();
    });

    $("#btnEmpty").on("click", function() {
        if (cart.length === 0) {
            alert("Keranjang sudah kosong!");
            return;
        }

        if (!confirm("Apakah Anda yakin ingin mengosongkan seluruh keranjang?")) {
            return;
        }

        for (var i = 0; i < cart.length; i++) {
            var produk = findProduct(cart[i].id);
            if (produk) {
                produk.stok++;
                updateStockDisplay(produk);
            }
        }

        $("#cartList").empty();
        cart = [];

        updateCartSummary();
    });

    $("#btnToggleCart").on("click", function() {
        $("#cartPanel").fadeToggle(400);
    });

    $("#btnCheckout").on("click", function() {
        if (cart.length === 0) {
            alert("Keranjang masih kosong! Silakan tambahkan produk terlebih dahulu.");
            return;
        }

        var namaPembeli = prompt("Masukkan nama Anda untuk checkout:");

        if (namaPembeli === null || namaPembeli.trim() === "") {
            alert("Checkout dibatalkan. Nama pembeli harus diisi.");
            return;
        }

        namaPembeli = namaPembeli.trim();

        var totalHarga = 0;
        var orderHTML = '<h2> Pesanan Berhasil!</h2>';
        orderHTML += '<p class="order-buyer"><strong>Pembeli:</strong> ' + namaPembeli + '</p>';
        orderHTML += '<hr style="margin:10px 0; border:none; border-top:1px solid #eee;">';

        for (var i = 0; i < cart.length; i++) {
            totalHarga += cart[i].harga;
            orderHTML += '<div class="order-line">' +
                            '<span>' + (i + 1) + '. ' + cart[i].nama + '</span>' +
                            '<span>Rp ' + formatRupiah(cart[i].harga) + '</span>' +
                         '</div>';
        }

        orderHTML += '<div class="order-total">Total: Rp ' + formatRupiah(totalHarga) + '</div>';

        $("#orderSummary").html(orderHTML).fadeIn(500);

        $("#cartList").empty();
        cart = [];
        updateCartSummary();

        $("html, body").animate({
            scrollTop: $("#orderSummary").offset().top - 100
        }, 600);
    });

    $("#searchInput").on("keyup", function() {
        var keyword = $(this).val().toLowerCase();

        $(".product-card").each(function() {
            var namaProduk = $(this).attr("data-nama");
            $(this).toggle(namaProduk.indexOf(keyword) !== -1);
        });
    });

});

