import React from "react";
import ReactDOM from "react-dom";
import Router from "router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "css/app.scss";
import "css/style.scss";
import 'common/authorization';

ReactDOM.render(
  <div>
    {/* notification component. Configure on fkhadra.github.io/react-toastify */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.querySelector("#root")
);
