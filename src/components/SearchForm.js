import React from "react";

function SearchForm(props) {
  return (
    <form>
      <div className="input-group">
        <input 
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For a Employee"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mb-2">
          Search
        </button>
      </div>
      <div className="btn-toolbar">
      <button onClick={props.handleNameSort} className="btn btn-primary mr-1">Name</button>
      <button onClick={props.handleCitySort} type="button" className="btn btn-primary mr-1">Location</button>
      <button onClick={props.resetSearch} type="button" className="btn btn-primary mr-1">Reset Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
