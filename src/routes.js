import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AuthGuard from "./components/Auth/AuthGuard";
import GuestGuard from "./components/Auth/GuestGuard";
import MainLayout from "./layouts/MainLayout";
import { BASE_URL } from "./services/LoginConfig";

export const renderRoutes = (routes = []) => (
  <Suspense fallback="Loading...">
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: "/login",
    component: lazy(() => import("./components/LoginComponent")),
  },
  {
    path: "*",
    layout: MainLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: "/home",
        component: lazy(() => import("./components/MainComponents")),
      },
      {
        exact: true,
        path: "/payroll",
        component: lazy(() => import("./components/PayrollMain")),
      },
      {
        exact: true,
        path: "/supplyPayroll",
        component: lazy(() =>
          import("./components/SupplementaryPayBill/SupplyPayrollMain")
        ),
      },
      {
        exact: true,
        path: "/supplyEmployeePayroll",
        component: lazy(() =>
          import(
            "./components/SupplementaryPayBill/SupplyEmployeePayrollStructure"
          )
        ),
      },
      {
        exact: true,
        path: "/employeePayroll",
        component: lazy(() => import("./components/EmployeePayrollStructure")),
      },
      {
        exact: true,
        path: "/PayrollSummary",
        component: lazy(() =>
          import("./components/summary/SummaryPageComponent")
        ),
      },
      {
        exact: true,
        path: "/SupplyPayrollSummary",
        component: lazy(() =>
          import("./components/SupplementaryPayBill/SupplySummaryPagecomponent")
        ),
      },
      {
        exact: true,
        path: "/reports",
        component: lazy(() => import("./components/EmployeeUpdation/Reports")),
      },

      {
        exact: true,
        path: "/ddoCode",
        component: lazy(() => import("./components/EmployeeUpdation/ddoCode")),
      },
      {
        exact: true,
        path: "/employeeHome",
        component: lazy(() =>
          import("./components/EmployeeUpdation/EmployeeHome")
        ),
      },
      {
        exact: true,
        path: "/transferIn",
        component: lazy(() =>
          import("./components/EmployeeUpdation/TransferIn")
        ),
      },
      {
        exact: true,
        path: "/pensions",
        component: lazy(() => import("./components/Pensions/Pensions")),
      },
      {
        exact: true,
        path: "/PensionStopages",
        component: lazy(() => import("./components/Pensions/PensionStopages")),
      },
      {
        exact: true,
        path: "/PensionStopages1",
        component: lazy(() => import("./components/Pensions/PensionStopages1")),
      },
      {
        exact: true,
        path: "/PensionStopages2",
        component: lazy(() => import("./components/Pensions/PensionStopages2")),
      },
      {
        exact: true,
        path: "/pensions1",
        component: lazy(() => import("./components/Pensions/Pensions1")),
      },
      {
        exact: true,
        path: "/pensionsstopage",
        component: lazy(() => import("./components/Pensions/PensionsStopage")),
      },
      {
        exact: true,
        path: "/pensionsavc",
        component: lazy(() => import("./components/Pensions/PensionsAVC")),
      },
      {
        exact: true,
        path: "/addallowance",
        component: lazy(() => import("./components/Pensions/AddAllowance")),
      },
      {
        exact: true,
        path: "/adddr",
        component: lazy(() => import("./components/Pensions/AddDR")),
      },
      {
        exact: true,
        path: "/ppolist",
        component: lazy(() => import("./components/Pensions/PPOList")),
      },
      {
        exact: true,
        path: "/ppoGetData",
        component: lazy(() => import("./components/Pensions/ppoGetData")),
      },
      {
        exact: true,
        path: "/verificationCertificate",
        component: lazy(() => import("./components/Pensions/verificationCertificate")),
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to={BASE_URL} />,
      },
    ],
  },
];

export default routes;
