import React from "react";
import { Redirect, Route } from 'react-router-dom';
 
const PrivateRoute = ({ component: Component, ...rest }) => {
 return (
   <Route
     {...rest}
     render={(componentProps) => {
       if (localStorage.getItem("token")) {
         return <Component {...componentProps} />
       }
       else {
         return <Redirect to="/" />
       }
     }}
   />
 )
}
export default PrivateRoute;
 
