import { createBrowserRouter } from "react-router"
import Blog from "./containers/Blog/Blog";
import SignUp from "./containers/Signup/SignUp";
import SignIn from "./containers/Signin/SignIn";
import { ProtectedLayout } from "./layouts/protectedLayout";
import {PublicLayout} from "./layouts/publicLayout"
import PublisherRegister from "./containers/Publishers/PublisherRegister";
import { loadRecommendedArticles } from "./loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: async() => {return await loadRecommendedArticles()},
    Component: ProtectedLayout,
    children: [
      {index: true, Component: Blog},
    ]
  },
  {
    Component: PublicLayout,
    children:[
      {path: 'sign-up', Component: SignUp},
      {path: 'sign-in', Component: SignIn},
      {path: 'addpublisher', Component: PublisherRegister}
    ]

  }
]);



  //   path: "/home",
  //   Component: Blog,
  //   children: [
  //     { index: true, Component: Home },
  //     { path: "about", Component: About },
  //     {
  //       path: "auth",
  //       Component: AuthLayout,
  //       children: [
  //         { path: "login", Component: Login },
  //         { path: "register", Component: Register },
  //       ],
  //     },
  //     {
  //       path: "concerts",
  //       children: [
  //         { index: true, Component: ConcertsHome },
  //         { path: ":city", Component: ConcertsCity },
  //         { path: "trending", Component: ConcertsTrending },
  //       ],
  //     },
  //   ],
  // }

