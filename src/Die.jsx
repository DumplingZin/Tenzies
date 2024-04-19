import React from "react";

const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld === true ? "#59E391" : "white",
  };
  return (
    <div style={styles} className="dice_face" onClick={props.handler}>
      <h1 className="dice_number">{props.value}</h1>
    </div>
  );
};

export default Dice;
