import React, { useState,useEffect } from "react";
import { AiFillDelete } from 'react-icons/ai';
//import { AiFillEdit } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';


function New() {
  const [input, setInput] = useState("");
  const [desc, setDes] = useState("");
  const [alltodo, setAllTodo] = useState([]);

  const clickHandler = () => {
 
    let newTodo = {
      title: input,
      description: desc,
    };
    let completeTodo = [...alltodo];
    completeTodo.push(newTodo);
    setAllTodo(completeTodo); 
    localStorage.setItem('todolist', JSON.stringify(completeTodo)); // It will prevent the erases the data after every re-render
  };

//const DeleteHandler = (index) =>{
//const delTodo=[...alltodo];
//delTodo.filter((index)=>{
// localStorage.setItem('todolist', JSON.stringify(delTodo)); 
//setAllTodo(delTodo)
//})
//}

const DeleteHandler = (index) =>{
const delTodo=[...alltodo];
delTodo.splice(index,1)
 localStorage.setItem('todolist', JSON.stringify(delTodo)); 
setAllTodo(delTodo)

}


useEffect(()=>{
//getItem - get values from localStorage
// If localStorage is empty that will not assigning empty or null
const saveTodo=JSON.parse(localStorage.getItem('todolist'));
if(saveTodo){
setAllTodo(saveTodo);
}
},[])
  return (
    <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDes(e.target.value)}
        />
        <button onClick={clickHandler}>click</button>
        {alltodo.map((item, index) => {
          return (
            <div key={index}>
              <h2>Title : {item.title}</h2>
              <p>Description : {item.description}</p>

              <IoMdDoneAll className="done-btn" />
              <AiFillDelete className="del-btn" onClick={()=>DeleteHandler(index)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default New;
