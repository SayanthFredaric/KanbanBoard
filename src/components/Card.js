import React from "react";

import "./Kanban.css";

export default function Card(props) {
  // The card component to display data- props have the card data like id, user id title and tag
  return (
    <li className="card">
      <div>
        <span className="card-id">🆔 {props.data.id}</span>
        <span className="card-user-id">👨‍💻 {props.data.userId}</span>
      </div>

      <div className="card-title">{props.data.title}</div>
      <div className="card-tag">⚫️ {props.data.tag[0]}</div>
    </li>
  );
}
