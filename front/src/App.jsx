import Home from "./pages/Home";
import Login from "./pages/Login";

import {createBrowserRouter, RouterProvider} from "react-router-dom"

const appRouter = createBrowserRouter([
{
  path:"/",
  element:<Home />
},
{
  path:"/login",
  element:<Login />
}
])
function App() {
  
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
