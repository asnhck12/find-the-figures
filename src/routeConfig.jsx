import App from "./App"
import MainPage from "./modules/MainPage/MainPage"
import HomePage from "./modules/HomePage/HomePage"

const routesConfig = ([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element:<HomePage />},
        {path: "game/:levelId", element: <MainPage />}
      ]
    }
  ])

  export default routesConfig