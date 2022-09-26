import React, {useEffect, useState} from "react";

function Sort({sortTransactions}){

    function handleClick(e){
        const id = e.target.id              
        sortTransactions(id)
    }

    return <>
        <div>
            <p>Sort transactions by 
                <span id = "des" className="ui button" onClick={handleClick}> description &darr;</span>
                <span  id= "cat"
                    className="ui button"
                    onClick={e=>{handleClick(e)}  }
                > category &darr;</span>            
            </p>
        </div>
    </>
}

export default Sort;