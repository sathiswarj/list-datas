import React, { useState, useEffect } from "react";
import "./New.css";
import { AiFillDelete } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";

function New() {
  const [complete, setComplete] = useState(false);
  const [input, setInput] = useState("");
  const [desc, setDes] = useState("");
  const [alltodo, setAllTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);

  const clickHandler = () => {
    let newTodo = {
      title: input,
      description: desc
    };
    let completeTodo = [...alltodo];
    completeTodo.push(newTodo);
    setAllTodo(completeTodo);
    localStorage.setItem("todolist", JSON.stringify(completeTodo));  
    setInput("");
    setDes("");
  };

  const handComplete = (index) => {
    const filteredList = {
      ...alltodo[index]
    };
    const completeList = [...completeTodo];
    completeList.push(filteredList);
    setCompleteTodo(completeList);
    localStorage.setItem("completeTodo", JSON.stringify(completeList));
    DeleteHandler(index);
  };

  const DeleteHandler = (index) => {
    const delTodo = [...alltodo];
    delTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(delTodo));
    setAllTodo(delTodo);
  };

  const DeleteListHandler = (index) => {
    const delTodo = [...completeTodo];
    delTodo.splice(index, 1);
    localStorage.setItem("completeTodo", JSON.stringify(delTodo));
    setCompleteTodo(delTodo);
  };

  useEffect(() => {
     
    const saveTodo = JSON.parse(localStorage.getItem("todolist"));
    const saveCompleteTodo = JSON.parse(localStorage.getItem("completeTodo"));
    if (saveTodo) {
      setAllTodo(saveTodo);
    }
    if (saveCompleteTodo) {
      setCompleteTodo(saveCompleteTodo);
    }
  }, []);
  return (
    <div className="container">
     
        <div className="lists">
          <input
            type="text"
            className="input-data"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            className="input-data"
            value={desc}
            onChange={(e) => setDes(e.target.value)}
          />
          <button className="click-btn" onClick={clickHandler}>click</button>
          <br></br>
          <br></br>
         </div>
        <button
          id="completed"
          className={`complete ${complete === false && "active"}`}
          onClick={() => setComplete(false)}
        >
          List
        </button>
        <button
          className={`complete ${complete === true && "active"}`}
          id="completed"
          onClick={() => setComplete(true)}
        >
          Completed
        </button>        
{complete === false &&
          alltodo.map((item, index) => {
            return (
              <ol className="form-list" key={index}>
                <div className="list-items">
                  <h3>Title : {item.title}</h3>
                  <p>Description : {item.description}</p>
                </div>
                <div className="btn-list">
                  <IoMdDoneAll
                    className="icon"
                    onClick={() => handComplete(index)}
                  />
                  <AiFillDelete
                    className="icon"
                    onClick={() => DeleteHandler(index)}
                  /> 
                </div>
              </ol>
            );
          })}
        {complete === true &&
          completeTodo.map((item, index) => {
            return (
              <ol className="form-list" key={index}>
                <div className="list-items">
                  <h3>Title : {item.title}</h3>
                  <p>Description : {item.description}</p>
                </div>
                <div className="btn-list">
                   <AiFillDelete
                    className="icon"
                    onClick={() => DeleteListHandler(index)}
                  />  
                </div>
              </ol>
            );
          })}
      </div>
   
  );
}

export default New;
