import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes";

const AppContent = () => (
    <>
      <Suspense>
        <Switch>
          {routes.map((route, idx) => (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            ))}
          <Redirect from="/" to="/Dashboard" />
        </Switch>
      </Suspense>
    </>
  );

export default React.memo(AppContent);
