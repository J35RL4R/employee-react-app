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
    API.getUsers()
      .then((res) => {
        this.setState({
          employees: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            city: e.location.city,
            key: i,
          })),
        });
      })
      .catch((err) => console.log(err));
  }


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
    this.searchEmployee(this.state.search);
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {[...this.state.result].map((item) => (
                  <Card
                    picture={item.picture}
                    firstName={item.name.first}
                    lastName={item.name.last}
                    email={item.email}
                    phone={item.phone}
                    city={item.location.city}
                    key={item.key}
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
