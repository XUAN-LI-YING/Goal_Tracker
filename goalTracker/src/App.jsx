// import libeary
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import page
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import Personal from "./Pages/Personal";
import Goals from "./Pages/Goals";
import Loading from "./components/Loading/Loading";
//Redux store
import { Provider } from "react-redux";
import { store } from "./Store/store";
// import loader function
import { getCompletionStats } from "./Store/GetCompletionSlice";

//get today date
const now = new Date();
const todayYear = now.getFullYear();
const todayMonth = now.getMonth() + 1;
const todayDay = now.getDate();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Goals /> },
      {
        path: "personal",
        element: <Personal />,
        loader: async () => {
          return await getCompletionStats(todayYear, todayMonth, todayDay);
        },
        hydrateFallbackElement: <Loading />
      },
      { path: "/home", element: <Home /> }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  );
}

export default App;
