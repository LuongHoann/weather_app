import React from "react";
import "./style.css";

export  default function Loading(){
  return (
    <div className="modal">
      <h1>
        Loading
        <span className="dot-animate">.</span>
        <span className="dot-animate">.</span>
        <span className="dot-animate">.</span>
        <span className="dot-animate">.</span>
      </h1>
    </div>
  );
};
