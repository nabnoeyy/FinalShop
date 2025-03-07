let cart = {}; // ตัวแปรเก็บสินค้าในตะกร้า

// ฟังก์ชันอัปเดตจำนวนสินค้า

function updateQuantity(amount) {
    
    const quantityElement = document.getElementById("quantity");
    let quantity = Math.max(1, parseInt(quantityElement.innerText) + amount); // ห้ามจำนวนติดลบ
    quantityElement.innerText = quantity;

    
}

// เปิด Modal เมื่อกดปุ่ม Add to Cart
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function() {
        const productKey = this.getAttribute('data-product-id');
    
        // เก็บ productKey ในปุ่ม Add to Cart
        document.getElementById('addToCart').setAttribute('data-product-id', productKey);
    
        // รีเซ็ตจำนวนให้เป็น 1 ทุกครั้งที่เปิด Modal
        document.getElementById("quantity").innerText = 1;
    
        $('#cartModal').modal('show');
    });
});



// ฟังก์ชันเพิ่มสินค้าเข้าตะกร้า
document.getElementById('addToCart').addEventListener('click', function() {
    const productKey = this.getAttribute('data-product-id');
    const topping = document.getElementById('topping').value;
    const sugar = document.getElementById('sugar').value;
    
    // ✅ ดึงราคาสินค้า
    const productPrice = parseFloat(this.getAttribute('data-price'));  
    // ✅ ดึงราคาท็อปปิ้ง
    const toppingPrice = parseFloat(document.getElementById('topping').selectedOptions[0].getAttribute('data-price')); 
    // ✅ ดึงจำนวนสินค้า
    const quantity = parseInt(document.getElementById("quantity").innerText); 

    // ✅ คำนวณราคาสินค้ารวม
    const finalPrice = (productPrice + toppingPrice) * quantity; 

    // ✅ เพิ่มสินค้าเข้าตะกร้า
    if (!cart[productKey]) {
        cart[productKey] = { 
            quantity: quantity, 
            price: finalPrice, // ราคารวมของสินค้าทั้งหมด
            productPrice: productPrice, // ราคาต่อชิ้น
            topping: topping,
            sugar: sugar,
            toppingPrice: toppingPrice // ราคาท็อปปิ้ง
        };
    } else {
        cart[productKey].quantity += quantity; 
        cart[productKey].price = (cart[productKey].productPrice + cart[productKey].toppingPrice) * cart[productKey].quantity;
    }

    updateCartDisplay();
    $('#cartModal').modal('hide'); // ปิด Modal
});

// เปิด Modal เมื่อกดปุ่ม Add to Cart
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function() {
        const productKey = this.getAttribute('data-product-id');
        const productPrice = parseFloat(this.getAttribute('data-price'));  // ✅ ดึงราคาสินค้าจากปุ่มที่ถูกกด

        // เก็บค่า productKey และ productPrice ในปุ่ม Add to Cart
        const addToCartBtn = document.getElementById('addToCart');
        addToCartBtn.setAttribute('data-product-id', productKey);
        addToCartBtn.setAttribute('data-price', productPrice);  // ✅ เพิ่ม data-price

        document.getElementById("quantity").innerText = 1; // รีเซ็ตจำนวนให้เป็น 1
        $('#cartModal').modal('show');
    });
});


// ฟังก์ชันอัปเดตการแสดงผลของตะกร้า
function updateCartDisplay() {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = "";

    if (Object.keys(cart).length === 0) {
        cartElement.innerHTML = "<p>No items in cart.</p>";
        return;
    }

    let totalCartPrice = 0; // ✅ ราคารวมของทั้งตะกร้า

    Object.keys(cart).forEach(item => {
        const cartItem = cart[item];
        const itemTotalPrice = cartItem.price; // ✅ ราคาสินค้านั้นทั้งหมด

        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p><strong>${item}</strong></p>
            <p>🔹 จำนวน: ${cartItem.quantity} | ราคา: $${itemTotalPrice.toFixed(2)}</p>
            <p>🔹 ท็อปปิ้ง: ${cartItem.topping} | น้ำตาล: ${cartItem.sugar}</p>
            <hr>
        `;

        cartElement.appendChild(itemElement);
        totalCartPrice += itemTotalPrice; // ✅ คำนวณราคาทั้งหมด
    });

    // ✅ เพิ่มแสดงราคารวมทั้งหมดของตะกร้า
    const totalPriceElement = document.createElement("div");
    totalPriceElement.classList.add("total-price");
    totalPriceElement.innerHTML = `<strong>รวมทั้งหมด: $${totalCartPrice.toFixed(2)}</strong>`;
    cartElement.appendChild(totalPriceElement);
}


// พิมพ์ใบเสร็จ
document.getElementById("printCart").addEventListener("click", () => {
    printReceipt("Thank you!", generateCartReceipt());
  });
  
  function printReceipt(title, content) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>${title}</title></head><body>${content}</body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  function generateCartReceipt() {
    let receiptContent = `
      <style>
        @page { size: 100mm 100mm; }
        body { width: 100mm; height: 100mm; margin: 0; padding: 1px; font-family: Arial, sans-serif; }
        h2 { text-align: center; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        th, td { border: 1px solid #ddd; padding: 5px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
      <p>HOP COFFEE!</p>
          <p>ตั้งอยู่ที่ 75/55 ตำบลวังตะกู อำเภอเมืองนครปฐม จังหวัดนครปฐม 73000。</p>
          <br>
      <h2>Cart Receipt</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Sweet</th>
            <th>Quantity</th>
            <th>Topping</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    let totalPrice = 0;

    for (const productKey in cart) {
      const item = cart[productKey];
      const itemTotalPrice = item.price;

      receiptContent += `
        <tr>
          <td>${productKey}</td>
          <td>${item.sugar}</td>
          <td>${item.quantity}</td>
          <td>${item.topping} ($${item.toppingPrice})</td>
          <td>$${item.productPrice}</td>
          <td>$${itemTotalPrice.toFixed(2)}</td>
        </tr>
      `;
      totalPrice += itemTotalPrice;  // ✅ ใช้ totalPrice เพื่อคำนวณผลรวม
    }

    receiptContent += `</tbody></table><p><strong>รวมทั้งหมด: $${totalPrice.toFixed(2)}</strong></p><p>คุณ Nabnoeyy Tel.0986438616</p>`;

    return receiptContent;
}
