var ProductContract = artifacts.require("ProductContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ProductContract);
};