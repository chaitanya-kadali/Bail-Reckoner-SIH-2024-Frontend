import React, { useState } from "react";
import '../styles/PrintList.css';

 function PrintList(props){
   
    const render=()=>{
        if(props.usertype==="farmer"){
            return (props.cropname.replace(/^./, str => str.toUpperCase()));
        }else{
            return(props.email);
        }
    }
  return (
        <>
        <div className="card">
            <div className="card-row">
                <div>
                    <p className="name-link">{props.name1}</p>
                </div>
                <div className="text-end">
                    <p className="inline-block">{render()}</p>
                </div>
            </div>
            <div className="card-row">
                <div>
                    <p>{props.phone1}</p>
                </div>
                <div className="text-end">
                    <p>{props.district1}</p>
                </div>
            </div>
        </div>
        </>
       
       );
};

export default  PrintList;