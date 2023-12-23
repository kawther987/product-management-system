var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCatogry = document.getElementById("pCatogry");
var pDisc = document.getElementById("pDisc");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var nameMsg = document.getElementById("nameMsg");
var priceMsg = document.getElementById("priceMsg");
var catogryMsg = document.getElementById("catogryMsg");
var dicsMsg = document.getElementById("dicsMsg");
var productList = [];
var indexUpdate = 0;
var deletindex = 0;

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayData();
}

function addProduct() {
  if (validationName() && validatinPrice() && validatinCategory()) {
    var product = {
      name: pName.value,
      price: pPrice.value,
      catogry: pCatogry.value,
      discription: pDisc.value,
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    clearForm();
    displayData();
    pName.classList.remove("is-valid");
    pPrice.classList.remove("is-valid");
    pCatogry.classList.remove("is-valid");
    pDisc.classList.remove("is-valid");
    sucess();
  }
}

function clearForm() {
  pName.value = "";
  pPrice.value = "";
  pCatogry.value = "";
  pDisc.value = "";
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `  <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].catogry}</td>
            <td>${productList[i].discription}</td>
            <td>
               <button class="btn btn-warning btn-sm" onclick="setData(${i})">Update</button>
               <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">Delete</button>
            </td>
          </tr>`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function deleteItem(idx) {
  // console.log(productList);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          {
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          },
          productList.splice(idx, 1),
          localStorage.setItem("products", JSON.stringify(productList)),
          displayData()
        );
        // deleteItem(this.value);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

function search() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `  <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].catogry}</td>
            <td>${productList[i].discription}</td>
            <td>
               <button class="btn btn-warning btn-sm" >Update</button>
               <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">Delete</button>
            </td>
          </tr>`;
    }
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function setData(idx) {
  indexUpdate = idx;

  var currentProduct = productList[idx];

  pName.value = currentProduct.name;
  pPrice.value = currentProduct.price;
  pCatogry.value = currentProduct.catogry;
  pDisc.value = currentProduct.discription;

  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateProduct() {
  var product = {
    name: pName.value,
    price: pPrice.value,
    catogry: pCatogry.value,
    discription: pDisc.value,
  };
  productList.splice(indexUpdate, 1, product);
  localStorage.setItem("products", JSON.stringify(productList));
  displayData();

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  clearForm();
  pName.classList.remove("is-valid");
  pPrice.classList.remove("is-valid");
  pCatogry.classList.remove("is-valid");
  pDisc.classList.remove("is-valid");
}

function validationName() {
  var regex = /^\w{3,8}$/;
  if (regex.test(pName.value) == true) {
    pName.classList.add("is-valid");
    pName.classList.remove("is-invalid");
    nameMsg.classList.add("d-none");
    return true;
  } else {
    pName.classList.remove("is-valid");
    pName.classList.add("is-invalid");
    nameMsg.classList.remove("d-none");
    return false;
  }
}

function validatinPrice() {
  var regex = /^\d{2,5}$/;
  if (regex.test(pPrice.value)) {
    pPrice.classList.add("is-valid");
    pPrice.classList.remove("is-invalid");
    priceMsg.classList.add("d-none");
    return true;
  } else {
    pPrice.classList.add("is-invalid");
    pPrice.classList.remove("is-valid");
    priceMsg.classList.remove("d-none");
    return false;
  }
}

function validatinCategory() {
  var regex = /^(tv|mobile|labtop)$/i;
  if (regex.test(pCatogry.value)) {
    pCatogry.classList.add("is-valid");
    pCatogry.classList.remove("is-invalid");
    catogryMsg.classList.add("d-none");
    return true;
  } else {
    pCatogry.classList.add("is-invalid");
    pCatogry.classList.remove("is-valid");
    catogryMsg.classList.remove("d-none");
    return false;
  }
}

function validatinDescripition() {
  var regex = /\w{3,250}/;
  if (regex.test(pDisc.value)) {
    pDisc.classList.add("is-valid");
    pDisc.classList.remove("is-invalid");
    dicsMsg.classList.add("d-none");
    return true;
  } else {
    pDisc.classList.add("is-invalid");
    pDisc.classList.remove("is-valid");
    dicsMsg.classList.remove("d-none");
    return false;
  }
}

function sucess() {
  Swal.fire({
    title: "Good job!",
    text: "Your site is added !",
    icon: "success",
  });
}
