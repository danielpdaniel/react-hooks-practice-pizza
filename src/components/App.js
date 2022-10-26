import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState(false)
  const [pizzaToEdit, setPizzaToEdit] = useState(false)

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(resp=>resp.json())
    .then(data=>setPizzas(data))
  }, [])

  function handleEditClick(pizza){
    setPizzaToEdit(pizza)
  }

  function handlePizzaSubmit(pizzaObj){
    // console.log(pizzaObj)
    fetch(`http://localhost:3001/pizzas/${pizzaToEdit.id}`,{
      method: "PATCH",
      headers:
      {"Content-Type": "application/json"},
      body: JSON.stringify(pizzaObj)
    })
    .then(resp=>resp.json())
    .then(data=>setPizzas(pizzas.map(pizza=>pizza.id === data.id ? data : pizza)))
  }

  function handlePizzaChange(name, value){
    // console.log(value)
    setPizzaToEdit({...pizzaToEdit, [`${name}`]: value})
  }

  return (
    <>
      <Header />
      <PizzaForm 
      pizzaToEdit={pizzaToEdit} 
      onPizzaSubmit={handlePizzaSubmit} 
      id={pizzaToEdit.id}
      topping={pizzaToEdit.topping} 
      size={pizzaToEdit.size} 
      vegetarian={pizzaToEdit.vegetarian} 
      onPizzaChange={handlePizzaChange}/>
      <PizzaList pizzas={pizzas} onEditClick={handleEditClick}/>
    </>
  );
}

export default App;
