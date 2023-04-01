import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import Post from "./pages/Post";
import BlogPage from "./pages/BlogPage";
import EditPost from "./pages/EditPost";
import Footer from "./components/Footer";


const Layout = () => {
  return (
    <UserContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
    </UserContextProvider>
)}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <Post />
      },
      {
        path: "/post/:id",
        element: <BlogPage />
      },
      {
        path: "/edit/:id",
        element: <EditPost />
      }
    ] },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
