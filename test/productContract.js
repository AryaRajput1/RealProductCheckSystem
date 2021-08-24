const ProductContract =artifacts.require('ProductContract');

contract('SimpleSmartContract',()=>{  
    let productContract=null;

    before(async ()=>{
        productContract=await ProductContract.deployed();
    });
    it('set Product test',async ()=>{
     await productContract.setProduct(2,"detol","detol","mohit","a soap"); 
    });
   it('get Product test',async()=>{
     let id=2;
    let a=await productContract.getProduct(id); 
    console.log(a);

   });

   it('change Product owner name ',async()=>{
     await  productContract.setProductOwnerName(1,'rana');
   });
})