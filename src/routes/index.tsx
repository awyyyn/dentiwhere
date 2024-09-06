import { createBrowserRouter, useRoutes } from "react-router-dom";
import AuthRoutes from "./auth-routes";
import UserRoutes from "./user-routes";
  


export default function Routes() {
  const routes = useRoutes([AuthRoutes, UserRoutes]);
  const router = createBrowserRouter(routes)
  return routes
}
