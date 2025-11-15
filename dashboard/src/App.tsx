import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  RefineRoutes,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { resources } from "./router/resource";
import MainLayout from "./layout/mainLayout";
import { Toaster } from "react-hot-toast";
import { customDataProvider } from "./dataProvider";
import { authProvider } from "./providers/authProvider";
import AuthLayout from "./layout/authLayout";
import LoginPage from "./pages/auth/login";
import ForgottenPage from "./pages/auth/forgottenPassword";
import OtpPage from "./pages/auth/otp";
import ChangePasswordPage from "./pages/auth/changePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <RefineKbarProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={customDataProvider}
              routerProvider={routerBindings}
              resources={resources}
              authProvider={authProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "n1ZjuU-5Ygmje-LtaDCN",
              }}
            >
              <RefineRoutes>
                {(routes) => {
                  return (
                    <Routes>
                      <Route path={"auth"} element={<AuthLayout />}>
                        <Route index element={<LoginPage />} />
                        <Route path={"forgotten"} element={<ForgottenPage />} />
                        <Route path={"otp"} element={<OtpPage />} />
                        <Route
                          path={"reset"}
                          element={<ChangePasswordPage />}
                        />
                      </Route>

                      <Route
                        element={
                          <Authenticated key={"dashboard"}>
                            <MainLayout />
                          </Authenticated>
                        }
                      >
                        <Route
                          index
                          element={
                            <NavigateToResource resource={"statistics"} />
                          }
                        />
                        {routes}
                        <Route path={"*"} element={<ErrorComponent />} />
                      </Route>
                    </Routes>
                  );
                }}
              </RefineRoutes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </RefineKbarProvider>
      </BrowserRouter>
      <Toaster position={"bottom-right"} toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
