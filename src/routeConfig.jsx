import App from "./App"
import MainPage from "./modules/MainPage/MainPage"
import HomePage from "./modules/HomePage/HomePage"
import Timer from "./modules/MainPage/Timer"

const routesConfig = ([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element:<HomePage />},
        {path: "game/:levelId", element: <MainPage />},
        {path: "game/:levelId", element1: <Timer />}
      ]
    }
  ])

  export default routesConfig