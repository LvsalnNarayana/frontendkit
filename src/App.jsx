import { Route } from "react-router-dom";
import React from "react";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import menu from "./data/menu";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {menu.map((menuItem, index) => (
            <React.Fragment key={index}>
              {menuItem.children?.length > 0 ? (
                <Route path={menuItem?.route}>
                  {menuItem.children.map((childItem, childIndex) =>
                    childItem.component ? (
                      <Route
                        key={childIndex}
                        path={`${childItem.route}`}
                        element={React.createElement(childItem.component)}
                      />
                    ) : null
                  )}
                </Route>
              ) : menuItem.component ? (
                <Route
                  key={index}
                  path={`/${menuItem.route}`}
                  element={React.createElement(menuItem.component)}
                />
              ) : null}
            </React.Fragment>
          ))}

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
