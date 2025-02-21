// import libeary
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import page
import Root from "./Pages/Root";
import Home from "./pages/home";
import Personal from "./Pages/personal";
import Goals from "./Pages/Goals";

//Redux store
import { Provider } from "react-redux";
import { store } from "./Store/store";
// import loader function

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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
