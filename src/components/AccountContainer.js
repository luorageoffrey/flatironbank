import React, {useEffect, useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

import image from "../images/loading.gif"

function AccountContainer() {

  let [transactions, updateTransactionList ] = useState([])

  let [searchBarEmptyStatus, setSearchBarEmptyStatus ] = useState(true)

  let [loading, updateOnLoad] = useState(true)


  useEffect(()=>{
    fetch('http://localhost:8001/transactions')
    .then(r=>r.json())
    .then((data)=>{      

      console.log(data)

      setTransactions(data)

      
      console.log("transactions",transactions)
      updateOnLoad(false)

    })
  }, [searchBarEmptyStatus])

  function addTransaction(transaction){

    let newtransactions = [...transactions, transaction]

    setTransactions(newtransactions)

  }

  function setTransactions(transaction) {
   
    updateTransactionList(transaction)

  }

  function searchTransactions(value) {

    // console.log("filter",value)

    // console.log(transactions)

    // if(value === "") {
    //    console.log("was empty")
    //   // setTransactions(transactions)
    //   setSearchBarEmptyStatus(!searchBarEmptyStatus)
    //   return

    // }

    // let newtransactions = transactions
    // .filter((transaction)=>{
    //   if(transaction.description.startsWith(value)){
    //     return transaction
    //   }
    // })

    // console.log(newtransactions)

    // setTransactions(newtransactions)

    updateOnLoad(true)

    fetch('http://localhost:8001/transactions')
    .then(r=>r.json())
    .then((data)=>{      

      console.log(data)

      let newtransactions = data
      .filter((transaction)=>{
        if(transaction.description.startsWith(value)){
          return transaction
        }
    })

      setTransactions(newtransactions)

      
      console.log("transactions",transactions)
      updateOnLoad(false)

    })



  }


  return (
    <div>
      <Search searchTransactions = {searchTransactions}/>
      <AddTransactionForm addTransaction = {addTransaction} />

      {/* <img src={image}></img> */}



      { loading ? <img src={image} alt="loading"></img> : <TransactionsList transactions = {transactions}   updateTransactionList = {updateTransactionList} />}
      
    </div>
  );
}

export default AccountContainer;
