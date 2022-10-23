import React from "react";

export default function Die(props) {

  const styles = {
    backgroundColor: props.selected ? "#59E391" : "#FFFFFF"
  }

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <h2 className="die--num">
        {props.value}
      </h2>
    </div>
  )
}