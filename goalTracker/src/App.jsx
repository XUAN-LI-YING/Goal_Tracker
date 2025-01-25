// import libeary
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import page
import Root from "./Pages/Root";
import Home from "./pages/home";
import Personal from "./Pages/personal";
import Goals from "./Pages/Goals";

// import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Goals /> },
      { path: "personal", element: <Personal /> }
    ]
  },
  { path: "/home", element: <Home /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
