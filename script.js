document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault();
  window.location.href = "dashboard.html";
});
let products = [];

function addProduct() {
  let name = document.getElementById("pname").value;
  let price = document.getElementById("pprice").value;
  let stock = document.getElementById("pstock").value;

  if(name === "" || price === "" || stock === "") {
    alert("Please fill all fields");
    return;
  }

  let product = {
    name: name,
    price: price,
    stock: stock
  };

  products.push(product);
  showProducts();

  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("pstock").value = "";
}

function showProducts() {
  let table = document.getElementById("productTable");
  table.innerHTML = "";

  products.forEach(p => {
    let row = `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}
let customers = [];

function addCustomer() {
  let name = document.getElementById("cname").value;
  let phone = document.getElementById("cphone").value;

  if(name === "" || phone === "") {
    alert("Please fill all fields");
    return;
  }

  let customer = {
    name: name,
    phone: phone
  };

  customers.push(customer);
  showCustomers();

  document.getElementById("cname").value = "";
  document.getElementById("cphone").value = "";
}

function showCustomers() {
  let table = document.getElementById("customerTable");
  table.innerHTML = "";

  customers.forEach(c => {
    let row = `
      <tr>
        <td>${c.name}</td>
        <td>${c.phone}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}
function calculateTotal() {
  let price = document.getElementById("price").value;
  let qty = document.getElementById("qty").value;
  let total = price * qty;

  document.getElementById("total").value = total || 0;
}

function generateInvoice() {
  let customer = document.getElementById("customerName").value;
  let product = document.getElementById("productName").value;
  let price = document.getElementById("price").value;
  let qty = document.getElementById("qty").value;
  let total = document.getElementById("total").value;

  if(customer === "" || product === "" || price === "" || qty === "") {
    alert("Please fill all fields");
    return;
  }

  document.getElementById("pCustomer").innerText = customer;
  document.getElementById("pProduct").innerText = product;
  document.getElementById("pPrice").innerText = price;
  document.getElementById("pQty").innerText = qty;
  document.getElementById("pTotal").innerText = total;

  document.getElementById("invoicePreview").style.display = "block";
}
function printInvoice() {
  window.print();
}
