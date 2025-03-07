const cart = {};

// Event สำหรับเลือก Topping
// เมื่อคลิกปุ่ม Add to Cart
document.getElementById('addToCart').addEventListener('click', function() {
  const productKey = this.getAttribute('data-product-id');
  const basePrice = 39;

  const toppingElement = document.getElementById('topping');
  const topping = toppingElement.options[toppingElement.selectedIndex].text;
  const toppingPrice = parseFloat(toppingElement.options[toppingElement.selectedIndex].getAttribute('data-price')) || 0;



  const sugar = document.getElementById('sugar').value;
  const productKeyWithSize = `${productKey}-${size}`;

  // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือไม่
  if (!cart[productKeyWithSize]) {
    // สินค้าใหม่
    cart[productKeyWithSize] = { 
      quantity: 1,
      basePrice: basePrice,
      sizePrice: sizePrice,
      topping: topping,
      toppingPrice: toppingPrice,
      sugar: sugar,
      totalPrice: basePrice +  toppingPrice // คำนวณราคาเริ่มต้น
    };
  } else {
    // เพิ่มจำนวนสินค้า
    cart[productKeyWithSize].quantity += 1;  
    cart[productKeyWithSize].totalPrice = (cart[productKeyWithSize].basePrice + cart[productKeyWithSize].toppingPrice) * cart[productKeyWithSize].quantity;
  }

  console.log("Cart after adding item:", cart);
  updateCartDisplay();  
  $('#cartModal').modal('hide');
});

// ฟังก์ชันอัปเดตรถเข็น
function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Product", "Size", "Quantity", "Price", "Topping", "Total", "Actions"].forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (const productKey in cart) {
    const item = cart[productKey];
    const itemTotalPrice = item.totalPrice;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${productKey.split('-')[0]}</td>
      <td>${productKey.split('-')[1]}</td>
      <td>${item.quantity}</td>
      <td>฿${item.basePrice + item.sizePrice}</td>
      <td>${item.topping} (฿${item.toppingPrice})</td>
      <td>฿${itemTotalPrice.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger delete-product" data-product-id="${productKey}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
    totalPrice += itemTotalPrice;
  }

  table.appendChild(tbody);
  cartElement.appendChild(table);

  const totalPriceElement = document.createElement("p");
  totalPriceElement.textContent = `Total Price: ฿${totalPrice.toFixed(2)}`;
  cartElement.appendChild(totalPriceElement);

  document.querySelectorAll(".delete-product").forEach(button => {
    button.addEventListener("click", () => {
      const productKey = button.getAttribute("data-product-id");
      delete cart[productKey];
      updateCartDisplay();
    });
  });
}





// เมื่อคลิกปุ่ม Add to Cart
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', function() {
    const productKey = this.getAttribute('data-product-id');
    const price = parseFloat(this.getAttribute('toping-data'));

    // Store product data in modal
    document.getElementById('addToCart').setAttribute('data-product-id', productKey);
    document.getElementById('addToCart').setAttribute('data-toping-data', price);

    // Set initial value for size in modal
    const selectedSize = document.getElementById('size').value;
    updateModalPrice(selectedSize);

    // Show the modal
    $('#cartModal').modal('show');
  });
});







// ฟังก์ชันสำหรับอัปเดตราคาใน modal ตามขนาด
function updateModalPrice(size) {
  let sizePrice = 0;

  switch(size) {
    case "Small":
      sizePrice = 19;
      break;
    case "Medium":
      sizePrice = 24;
      break;
    case "Large":
      sizePrice = 29;
      break;
  }

  document.getElementById('addToCart').textContent = `Add to Cart - ฿${sizePrice}`;
}
// Event สำหรับเพิ่มสินค้าในตะกร้า
// เมื่อคลิกปุ่ม Add to Cart
document.getElementById('addToCart').addEventListener('click', function() {
  const productKey = this.getAttribute('data-product-id');
  const basePrice = parseFloat(this.getAttribute('data-price')) || 0;

  const toppingElement = document.getElementById('topping');
  const topping = toppingElement.options[toppingElement.selectedIndex].text;
  const toppingPrice = parseFloat(toppingElement.options[toppingElement.selectedIndex].getAttribute('data-price')) || 0;

  const sizeElement = document.getElementById('size');
  const size = sizeElement.options[sizeElement.selectedIndex].text;
  const sizePrice = parseFloat(sizeElement.options[sizeElement.selectedIndex].getAttribute('data-price')) || 0;

  const sugar = document.getElementById('sugar').value;

  const productKeyWithSize = `${productKey}-${size}`;

  // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือไม่
  if (!cart[productKeyWithSize]) {
    // สินค้าใหม่ในตะกร้า
    cart[productKeyWithSize] = { 
      quantity:1, // จำนวนเริ่มต้นเป็น 1
      basePrice: basePrice,
      topping: topping,
      toppingPrice: toppingPrice,
      sugar: sugar,
      sizePrice: sizePrice,
      totalPrice:(basePrice  + toppingPrice) * quantity
    };
  } else {
    // เพิ่มจำนวนสินค้า
    cart[productKeyWithSize].quantity += 1;  // เพิ่มจำนวนสินค้าให้เป็นตัวแปร quantity ที่มีการอัปเดตแล้ว
    // คำนวณราคาใหม่
    cart[basePrice].totalPrice = (cart[basePrice].basePrice + cart[basePrice].toppingPrice ) * cart[basePrice].quantity;
  }

  console.log("Cart after adding item:", cart);
  updateCartDisplay();  // อัปเดตการแสดงผลของตะกร้า
  $('#cartModal').modal('hide');  // ปิด modal
});


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

// สร้างใบเสร็จ
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
    <p>SANGKONG SHOP!</p>
    <h2>Cart Receipt</h2>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Topping</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;
  let totalPrice = 0;

  for (const productKey in cart) {
    const item = cart[productKey];
    const itemTotalPrice = (item.basePrice + item.sizePrice + item.toppingPrice) * item.quantity;


    receiptContent += `
      <tr>
        <td>${productKey}</td>
        <td>${item.quantity}</td>
        <td>฿39</td>
        <td>${item.topping} (฿${item.toppingPrice})</td>
        <td>฿${itemTotalPrice.toFixed(2)}</td>
      </tr>
    `;
    totalPrice += itemTotalPrice;
  }

  receiptContent += `
      </tbody>
    </table>
    <p>Total Price: $${totalPrice.toFixed(2)}</p>
    <p>คุณ Kays Tel.088-888-8888</p>
  `;

  return receiptContent;
}
