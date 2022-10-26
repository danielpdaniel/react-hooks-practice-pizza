import React, { useState } from "react";

function PizzaForm({ pizzaToEdit, onPizzaSubmit, id, topping, size, vegetarian, onPizzaChange }) {

  const sizeOptions = ["Small", "Medium", "Large"]

  function handleChange(e){
    onPizzaChange(e.target.name, e.target.value)
  }

  function handleVeggieChange(e){
    onPizzaChange(e.target.name, !vegetarian)
  }

  function handleSubmit(e){
    e.preventDefault();
    const newPizz = {
      ...pizzaToEdit, 
      id: id,
      topping: topping, 
      size: size, 
      vegetarian: vegetarian
    }
    onPizzaSubmit(newPizz)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder={pizzaToEdit ? pizzaToEdit.topping : "Pizza Topping"}
            value = {topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" onChange={handleChange}>
            {/* <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option> */}
            {sizeOptions.map(sizeOption => sizeOption === size ?
              <option key={sizeOption} selected value={`${sizeOption}`}>{sizeOption}</option> 
              : <option key={sizeOption} value={`${sizeOption}`}>{sizeOption}</option>)}
          </select>
        </div>
        <div className="col" onChange={handleVeggieChange}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={pizzaToEdit ? !vegetarian : null}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
