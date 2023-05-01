import React, { useContext } from "react";
import { Context } from "../context/contexto";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";


const Routes = () => {
  const { logado } = useContext(Context);
  return logado ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
