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
        { username === "" ? (<Login/>) : null}
      </div>
    </div>
  );
};
