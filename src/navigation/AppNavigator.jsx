import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "../screens/LandingPage";
import LobbyPage from "../screens/LobbyPage";
import MainPage from "../screens/MainPage";
import RulesPage from "../screens/RulesPage";
import LosePage from "../screens/LosePage";
import WinPage from "../screens/WinPage";
import Home from "../screens/Home";

const AppNavigator = (props) => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/lobby",
      element: <LobbyPage />,
    },
    {
      path: "/main",
      element: <MainPage />,
    },
    {
      path: "/rules",
      element: <RulesPage />,
    },
    {
      path: "/lose",
      element: <LosePage />,
    },
    {
      path: "/win",
      element: <WinPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppNavigator;
