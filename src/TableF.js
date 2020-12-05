import React, { useState, useEffect } from "react";
import "isomorphic-fetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import {FormattedMessage} from 'react-intl';

const keysJson = ["name", "description", "height", "weight"];
const TableF = (props) => {
  const [films, setFilms] = useState([]);
  const [keys, setKeys] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    setFilms(props.films);
    setKeys(props.keys);
    setTitle(props.title);
  });
  if (title === "") {
    return <div> </div>;
  } else
    return (
      <div>
        <h1>  <FormattedMessage id="Table.title"/> </h1>
        <Table>
          <thead>
            <tr class="thead-dark">
              <th> <FormattedMessage id="Table.id"/> </th>
              <th> <FormattedMessage id="Table.image"/> </th>
              <th> <FormattedMessage id="Table.name"/> </th>
              <th> <FormattedMessage id="Table.description"/> </th>
              <th> <FormattedMessage id="Table.height"/> </th>
              <th> <FormattedMessage id="Table.weight"/> </th>
              <th> <FormattedMessage id="Table.type"/> </th>
            </tr>
          </thead>
          <tbody>
            {films.map((f) => {
              return (
                <tr>
                  <th scope="row"> {f.id} </th>
                  <td>
                    <img
                      className="mb-5 img-fluid"
                      src={f.ThumbnailImage}
                      alt={f.name}
                    ></img>
                  </td>
                  {keysJson.map((k) => (
                    <td>{f[k]}</td>
                  ))}
                  <td>
                    {" "}
                    {f.type.map((t) => (
                      <span className="badge badge-secondary"> {t}</span>
                    ))}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
};
export default TableF;
