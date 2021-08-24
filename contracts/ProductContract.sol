// SPDX-License-Identifier: MIT

pragma solidity <= 0.8.4;
pragma experimental ABIEncoderV2;

contract ProductContract {
    struct Product{
        string product_name;
        string product_id;
        string company_owner;
        string product_owner;
        string product_detail;
        }
        
    mapping(string=>Product)  pr;
    
    function getProduct(string memory id) view public returns(string memory,string memory,string memory,string memory,string memory){
        
        return (pr[id].product_name,pr[id].product_id,pr[id].company_owner,pr[id].product_owner,pr[id].product_detail);
        
    }
    
    function setProduct(string memory id,string memory pn,string memory co ,string memory po,string memory pd) public
    {
        pr[id]=Product(pn,id,co,po,pd);
    }
    
    function setProductOwnerName(string memory id,string memory _name) public{
        pr[id].product_owner=_name;
    } 
}