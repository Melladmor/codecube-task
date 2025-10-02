import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { routes } from "./routes";
import type { RoutesI } from "./type";
import Error from "../components/Error";
import RouterWrapper from "../wrappers/RouterWrapper";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        {routes?.map((route: RoutesI) => {
          const Element = route?.element;

          if (route?.children) {
            return (
              <Route
                key={route?.path}
                path={route?.path}
                element={
                  <RouterWrapper
                    route={<Element />}
                    isPublic={route.isPublic}
                  />
                }>
                {route?.children?.map((child: RoutesI) => {
                  const ChildElement = child?.element;
                  return (
                    <Route
                      key={child?.path}
                      path={child?.path}
                      element={
                        <RouterWrapper
                          route={<ChildElement />}
                          isPublic={child.isPublic}
                        />
                      }
                    />
                  );
                })}
              </Route>
            );
          }

          return (
            <Route
              key={route?.path}
              path={route?.path}
              element={
                <RouterWrapper route={<Element />} isPublic={route.isPublic} />
              }
            />
          );
        })}
      </Route>

      <Route path="*" element={<Error />} />
    </>
  )
);
