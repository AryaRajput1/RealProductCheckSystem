// import ProductContract from '../build/contracts/ProductContract.json';

const contractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pn",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "co",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "po",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pd",
        "type": "string"
      }
    ],
    "name": "setProduct",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "setProductOwnerName",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const web3 = new Web3("http://127.0.0.1:9545");
var contractAddress = '0xe3bb6A9c62875C5ACE4041829381E81b40D508Dd';
var productContract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener('DOMContentLoaded', () => {
  console.log('working');
  var accounts = [];
  web3.eth.getAccounts().then(_accounts => {
    accounts = _accounts;
  });
  //search a product
  const searchProduct = document.querySelector('.searchProduct');
  const searchInpId = document.querySelector('.searchInp');
  searchProduct.addEventListener('click', searchP);
  function searchP() {

    let product_id = searchInpId.value;


    if (product_id != "") {
      productContract.methods.getProduct(product_id).call({ from: accounts[0], gas: "3000000" }).then(data => {

        if (data[0]) {
          alert('product is listed');
        } else {
          alert('product is Not listed');
        }
      });


    } else {
      alert('to get a product qr first enter a product id');
    }
  }

  // add a product
  const pn = document.querySelector('#pn');
  const pid = document.querySelector('#pid');
  const co = document.querySelector('#co');
  const pd = document.querySelector('#pd');
  const addBtn = document.querySelector('#add');
  addBtn.addEventListener('click', sendData);
  async function sendData() {
    let productName = pn.value;
    let productId = pid.value;
    let companyOwner = co.value;
    let productDetails = pd.value;

    if (!productName || !productId || !companyOwner || !productDetails) {
      alert('please enter proper details');
    } else {
      productContract.methods.setProduct(productId, productName, companyOwner, "None", productDetails).send({ from: accounts[0], gas: "3000000" }).then(console.log);
      successMsgg('Product is Listed');
    }

  }

  function successMsgg(msg) {
    let successMsg = document.querySelector('.successMsg');
    successMsg.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert" style="position:fixed;top:0px;right:0px;left:0px;z-index:1111111;">
    <strong>Complete..</strong> ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  }
  // add a product owner name

  const poid = document.querySelector('#poid');
  const pon = document.querySelector('#pon');
  const addPOBtn = document.querySelector('#addPOBtn');
  addPOBtn.addEventListener('click', sendPONData);
  async function sendPONData() {
    let productOwnerId = poid.value;
    let productOwnerName = pon.value;

    if (!productOwnerId || !productOwnerName) {
      alert('please enter proper details');
    } else {
      productContract.methods.setProductOwnerName(productOwnerId, productOwnerName).send({ from: accounts[0], gas: "3000000" }).then(console.log);
      successMsgg('Product Owner Name Added');
    }

  }



  // get a product
  const getProductBtn = document.querySelector('.getProductBtn');

// bootstrap modal for qr code scan.
  var myModal = new bootstrap.Modal(document.getElementById('productModal'), {
    keyboard: false
  })

  const getProductID = document.querySelector('.getProductID');
  getProductBtn.addEventListener('click', getProduct);


  var productData = {};
  function getProduct() {

    let product_id = getProductID.value;


    if (product_id != "") {
      productContract.methods.getProduct(product_id).call({ from: accounts[0], gas: "3000000" }).then(data => {

        if (data) {
          console.log(data);
          var productSpecification = `Product Id is ${data[1]}.Product is ${data[0]}.This Product is Made By ${data[2]}.And Bought by ${data[3]}. And This Product is REAL Note FAKE.`
          document.getElementById("qrcode").innerHTML = "";
          new QRCode(document.getElementById("qrcode"), productSpecification);
          myModal.show();
        } else {
          document.getElementById("qrcode").innerHTML = "";
          document.getElementById("qrcode").innerHTML = "THIS PRODUCT IS NOT REAL";
          myModal.show();
        }
      });


    } else {
      alert('to get a product qr first enter a product id');
    }
  }
}
);