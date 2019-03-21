import React, {useState} from "react";

const Card = (props) => {
  const { description, list_id } = props.card;
  const [desc, changeDescription] = useState(description);

  return (<div className="card">
    <textarea name="card-desc" cols="30" rows="3" className="card-desc">{desc}</textarea>
  </div>);
}

export default Card;