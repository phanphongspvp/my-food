// import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import OnlyHeaderLayout from "./layouts/OnlyHeaderLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout =
              route.layout === "headerOnly" ? OnlyHeaderLayout : MainLayout;
            const Page = route.component;
            const data = route.data;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page data={data} />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
