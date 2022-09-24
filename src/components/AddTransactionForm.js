import React, {useState} from "react";


function AddTransactionForm({addTransaction}) {

  let [date, setDate] = useState("")
  let [description, setDescription] = useState("")
  let [category, setCategory] = useState("")
  let [amount, setAmount] = useState("")

  function handleSubmit(event){
    event.preventDefault()

    let formData = {
      date,
      description,
      category,
      amount,
    }

    console.log(formData)

    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
       },
      body:JSON.stringify(formData),
    }).then((r)=>r.json())
    .then((data)=>{
      console.log(data);

      addTransaction(data)

      setDate("")
      setDescription("")
      setAmount("")
      setCategory("")


    })



  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">

          <input 
            type="date" 
            name="date" 
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />

          <input 
            type="text" 
            name="description" 
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <input 
            type="text" 
            name="category" 
            placeholder="Category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          />

          <input 
            type="number" 
            name="amount" 
            placeholder="Amount" 
            step="0.01"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
