import React/* , {useState} */ from "react";

const Card = (props) => {
  const { title, list_id } = props.card;
  // const [cardTitle, changeTitle] = useState(title);

  return (<div className="card" data-list_id={list_id}>
    <div className="card-settings"><i className="fas fa-pen"/></div>
    <div className="card-title">
      <p className="card-title-contents">{title}</p>
    </div>
  </div>);
}

export default Card;