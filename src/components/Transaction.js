import React from "react";

function Transaction({transaction, deleteTransaction}) {

  function handleDelete(id){

    console.log("delete transaction",id);

   deleteTransaction(id);

  }
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>

      <td><button onClick={e=>handleDelete(transaction.id)}>&#128465;</button></td>

      
    </tr>
  );
}

export default Transaction;
