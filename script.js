// ======== LocalStorage Keys ========
let customers = JSON.parse(localStorage.getItem("customers")) || ["Guest"];
let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"Product A", price:100},
  {name:"Product B", price:200},
  {name:"Product C", price:150}
];
let invoiceItems = JSON.parse(localStorage.getItem("invoiceItems")) || [];
let grandTotal = 0;
let invoiceNo = localStorage.getItem("invoiceNo") || 1;

// ======== Populate Customer Dropdown ========
function populateCustomer(){
  let select = document.getElementById("customerSelect");
  select.innerHTML = "";
  customers.forEach(c=>{
    select.innerHTML += `<option>${c}</option>`;
  });
}
populateCustomer();

// ======== Populate Product Dropdown ========
function populateProduct(){
  let select = document.getElementById("productSelect");
  select.innerHTML = "";
  products.forEach(p=>{
    select.innerHTML += `<option value="${p.price}">${p.name} - Rs ${p.price}</option>`;
  });
}
populateProduct();

// ======== Add New Customer ========
function addCustomer(){
  let newC = document.getElementById("newCustomer").value.trim();
  if(newC && !customers.includes(newC)){
    customers.push(newC);
    localStorage.setItem("customers", JSON.stringify(customers));
    populateCustomer();
    document.getElementById("newCustomer").value = "";
  }
}

// ======== Add Product to Invoice ========
function addProduct(){
  let productIndex = document.getElementById("productSelect").selectedIndex;
  let qty = parseInt(document.getElementById("productQty").value);
  if(qty <= 0) return alert("Enter valid quantity");
  
  let product = products[productIndex];
  let total = product.price * qty;
  
  invoiceItems.push({name:product.name, price:product.price, qty, total});
  localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
  updateTable();
  document.getElementById("productQty").value = "";
}

// ======== Update Invoice Table ========
function updateTable(){
  let table = document.getElementById("billingTable");
  table.innerHTML = "";
  grandTotal = 0;
  
  invoiceItems.forEach((item,index)=>{
    grandTotal += item.total;
    table.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.qty}</td>
      <td>${item.total}</td>
      <td><button onclick="removeItem(${index})">X</button></td>
    </tr>`;
  });
  document.getElementById("grandTotal").innerText = grandTotal;
  document.getElementById("invoiceNo").innerText = invoiceNo;
}

// ======== Remove Item ========
function removeItem(index){
  invoiceItems.splice(index,1);
  localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
  updateTable();
}

// ======== Print Invoice ========
function printInvoice(){
  if(invoiceItems.length===0) return alert("Add products first");
  
  let customer = document.getElementById("customerSelect").value;
  let printContent = `<h2> AL Qadir Machinery Retail Shop Invoice</h2>
    <p><b>Invoice #:</b> ${invoiceNo}</p>
    <p><b>Customer:</b> ${customer}</p>
    <table border="1" cellpadding="8" width="100%">
      <tr>
        <th>Product</th><th>Price</th><th>Qty</th><th>Total</th>
      </tr>`;
  
  invoiceItems.forEach(i=>{
    printContent += `<tr>
      <td>${i.name}</td>
      <td>${i.price}</td>
      <td>${i.qty}</td>
      <td>${i.total}</td>
    </tr>`;
  });
  
  printContent += `</table>
    <h3>Total Amount: Rs ${grandTotal}</h3>`;
  
  let w = window.open();
  w.document.write(printContent);
  w.print();
  w.close();
  
  // Reset Invoice
  invoiceItems = [];
  grandTotal = 0;
  invoiceNo++;
  localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
  localStorage.setItem("invoiceNo", invoiceNo);
  updateTable();
}
