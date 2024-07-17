import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";

const listsLoader = async () => {
  const response = await fetch(`http://localhost:3310/api/lists`);
  const data = await response.json();
  return data;
};

const itemsLoader = async () => {
  const response = await fetch(`http://localhost:3310/api/items`);
  const data = await response.json();
  return data;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: listsLoader,
      },
      {
        path: "/ItemsPage/:listId",
        element: <ItemsPage />,
        loader: itemsLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
