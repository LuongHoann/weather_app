import React from "react";
import Options from "./Options";
import Login from "./Login";
import FavouriteLocation from "./FavouriteLocation";
import { useUserContext } from "../userContext/userContext";

export default function HeaderPage(){
  const { username } = useUserContext();

  return (
    <div className="flex">
      <div className="">
        <Options />
        <Login />
      </div>
      {username !== "" /* have a user */ ? <FavouriteLocation /> : null}
    </div>
  );
};
