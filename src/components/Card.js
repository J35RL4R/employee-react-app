import React from "react";

function Card(props) {
  return (
    <tr>
      <th>
        <img alt={props.firstName} src={props.picture} />
      </th>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.city}</td>
    </tr>
  );
}

export default Card;
