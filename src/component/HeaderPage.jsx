import React from "react";
import { useUserContext } from "../userContext/userContext";
import Options from "./Options";
import Login from "./Login";

export default function HeaderPage(){
  const { username } = useUserContext();
  return (
    <div className="flex">
      <div className="">
        <Options username={username}/>
        <p style={{display:"flex" , justifyContent:"center"}}>Press <a href="https://www.latlong.net/" target="_blank">here</a>for research your longitude and latitude</p>
        {/* { username === "" ? (<Login/>) : null} */}
      </div>
    </div>
  );
};
