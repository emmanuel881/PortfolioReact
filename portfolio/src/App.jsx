

//layouts
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Layouts/adminLayout";
import UserLayout from "./Layouts/userLayout";

//pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotfound";
import Contact from "./pages/contact";
import AdminLogin from "./pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
    ]
  },
  {
    path: "/login",
    element: <AdminLogin />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Admin /> }
    ]
  },
  { path: "*", element: <PageNotFound /> }
])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
