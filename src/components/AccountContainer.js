import React, {useEffect, useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

import image from "../images/loading.gif"
import Sort from "./Sort";

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

  function sortTransactions(param){

    const sortedtransactions = [...transactions]

    let tr = sortedtransactions.sort((a,b)=>{

      console.log(param)

      if(param === "cat"){

        console.log("here 1",param)

        return a.category.localeCompare(b.category)

      }else if(param === "des"){

        console.log("here 2",param)

        return a.description.localeCompare(b.description)

      }  

      }     
   )

    console.log(tr)

    updateTransactionList(tr)

  }

  function deleteTransaction(id){

    fetch(`http://localhost:8001/transactions/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then().then((res)=>{

      console.log("delete me", res);

      let tr = transactions.filter((transaction)=>transaction.id !== id)

      updateTransactionList(tr)



    })
  }


  return (
    <div>
      <Search searchTransactions = {searchTransactions}/>
      <AddTransactionForm addTransaction = {addTransaction} />

      <Sort sortTransactions={sortTransactions}/>

      {/* <img src={image}></img> */}

      { loading ? <img src={image} alt="loading"></img> : 
        <TransactionsList 
          transactions = {transactions}   
          updateTransactionList = {updateTransactionList} 
          deleteTransaction={deleteTransaction}
        />}
      
    </div>
  );
}

export default AccountContainer;
