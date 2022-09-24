import React, {useState} from "react";


function Search({searchTransactions}) {

  let [searchTerm, setSearchTerm] = useState("")

  function handleSearch(value){
    setSearchTerm(value)
    console.log("Handle search",value)

    searchTransactions(value)
  }



  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <i className="circular search link icon"></i>

      

     

      {/* <i className="delete link icon"></i> */}

      {/* <input type="button" className="ui large fluid icon input"/> */}
    </div>
  );
}

export default Search;
