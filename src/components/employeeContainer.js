import React, { Component } from "react";
import Container from "./Container";
import Col from "./Col";
import Card from "./Card";
import Wrapper from "./Wrapper";
import SearchForm from "./SearchForm";

import API from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    result: [],
    search: ""
  };

  // When this component mounts, search for specific employee
  componentDidMount() {
  this.loadApi()
  };
  
  loadApi = () => {
    API.getUsers()
    .then(res =>
      this.setState({result: res.data.results})
      )
      .catch(err => console.log(err));
  }; 

  searchEmployee = query => {
    API.getUsers(query)  
    .then(res => this.setState({ result: res.data.results }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Employee API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    const filteredResults = this.state.result.filter(employee => employee.name.first.includes(this.state.search))
    console.log(this.state.search);
    this.setState({result: filteredResults});
  };
  
  handleNameSort = event => {
    event.preventDefault();
    const filteredResults = this.state.result.sort((a, b) => (a.name.first > b.name.first)? 1 : -1)
    console.log(this.state.search);
    this.setState({result: filteredResults});
  };

  handleCitySort = event => {
    event.preventDefault();
    const filteredResults = this.state.result.sort((a, b) => (a.location.city > b.location.city)? 1 : -1)
    console.log(this.state.search);
    this.setState({result: filteredResults});
  };
  
  render() {
    return (
      <Wrapper>
        <Container>
        <div className="container">
          <div className="row">
            <Col>
              <h2>Employee Directory</h2>
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Col>
          </div>
        </div>

        <div className="row">
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th onClick={this.handleNameSort}>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th onClick={this.handleCitySort}>City</th>
                </tr>
              </thead>
              <tbody>
                {[...this.state.result].map((data) => (
                  <Card
                    picture={data.picture.thumbnail}
                    firstName={data.name.first}
                    lastName={data.name.last}
                    email={data.email}
                    phone={data.phone}
                    city={data.location.city}
                    key={data.id.value}
                  />
                ))}
              </tbody>
            </table>
          </Col>
        </div>
        </Container>
      </Wrapper>
    )
  }
}
export default EmployeeContainer;
