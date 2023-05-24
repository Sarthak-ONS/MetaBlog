import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AbooutPage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import CreatorPage from "./pages/CreatorsPage/CreatorPage";
import WriteBlog from "./pages/CreatorsPage/WriteBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/new/:id",
        element: <WriteBlog />,
      },
      {
        path: "creators",
        element: <CreatorPage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
