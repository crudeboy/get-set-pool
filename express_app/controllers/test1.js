const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const Tx = require('ethereumjs-tx').Transaction;
const fetch=require("node-fetch"); 

const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;


module.exports=(app)=>{
   app.get("/test", async (req,res)=>{
      const provider=new HDwalletprovider(
        "grow public unable lunar together element ivory scout equal elite office punch",
        'https://ropsten.infura.io/v3/686f18f4f3144751bd5828b7155d0c55'
       );
  
       const web3=new Web3(provider);
  
       console.log("provider set");
  
       const contract=new web3.eth.Contract(abi,address);
  
       const response=await contract.methods.get("priyam").call();
       console.log(response);
  
  
  
     
  });
  app.get("/kyber",async (req,res)=>{
   const testnet = 'https://ropsten.infura.io/v3/686f18f4f3144751bd5828b7155d0c55';

   const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );

   // console.log(fetch);
   const addresss="0x3c6b8c5a05FB705cE825D3C6336ebA0B60d381d7";
   const addressr="0x7Ed99FcCe0BE64c1519aBB90a2bB6CC75FEa8a3C";
   web3.eth.defaultAccount =addresss;
   const nonce=await web3.eth.getTransactionCount(web3.eth.defaultAccount);
   console.log(`https://api.kyber.network/transfer_data?from=${addresss}&to=${addressr}&value=1&gas_price=medium&gas_limit=200000&nonce=${nonce}`)
   const request=await fetch(`https://api.kyber.network/transfer_data?from=${addresss}&to=${addressr}&value=1.5&gas_price=medium&gas_limit=200000&nonce=${nonce}`);
   
   const requestData=await request.json();
   console.log(requestData);
    console.log( web3.utils.toWei(fare,"ether"),web3.utils.toHex(web3.utils.toWei(fare,"ether")));
   //signs trans
      const sender="grow public unable lunar together element ivory scout equal elite office punch";
       const trans = await web3.eth.accounts.signTransaction(
         requestData.data
       ,sender);        
     
       const rawTrans=trans['rawTransaction'];
      
       console.log(trans['rawTransaction']);
      //send sign transc

   var privateKey = new Buffer.from(sender, 'hex');

   //with raw Transaction
   var tx = new Tx(rawTrans,{ chain:'ropsten',hardfork: 'petersburg'});
   tx.sign(privateKey);
   
   var serializedTx = tx.serialize();
   
   console.log(serializedTx.toString('hex'),"serialized");
   // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
   
   var payment= await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
   console.log(payment,"payment");

  });


}