import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./components/layout/About";
import Class from "./views/Class";
import ClassContextProvider from "./contexts/ClassContext";
import GradeContextProvider from "./contexts/GradeContext";
import YearContextProvider from "./contexts/YearContext";
import SubjectContextProvider from "./contexts/SubjectContext";
import WeekContextProvider from "./contexts/WeekContext";
import Subject from "./views/Subject";
import Week from "./views/Week";
import DashboardContextProvider from "./contexts/DashboardContext";
import LockclassContextProvider from "./contexts/LockclassContext";
import Lockclass from "./views/Lockclass";
import Addlockclass from "./views/Addlockclass";
function App() {
  return (
    <AuthContextProvider>
      <YearContextProvider>
        <WeekContextProvider>
          <GradeContextProvider>
            <ClassContextProvider>
              <SubjectContextProvider>
                <LockclassContextProvider>
                  <DashboardContextProvider>
                    <Router>
                      <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route
                          exact
                          path="/login"
                          render={(props) => (
                            <Auth {...props} authRoute="login" />
                          )}
                        />
                        <Route
                          exact
                          path="/register"
                          render={(props) => (
                            <Auth {...props} authRoute="register" />
                          )}
                        />
                        <ProtectedRoute
                          exact
                          path="/dashboard"
                          component={Dashboard}
                        />
                        <ProtectedRoute exact path="/about" component={About} />
                        <ProtectedRoute exact path="/class" component={Class} />
                        <ProtectedRoute
                          exact
                          path="/subject"
                          component={Subject}
                        />
                        <ProtectedRoute exact path="/week" component={Week} />
                        <ProtectedRoute
                          exact
                          path="/lockclass"
                          component={Lockclass}
                        />
                        <ProtectedRoute
                          exact
                          path="/addlockclass"
                          component={Addlockclass}
                        />
                      </Switch>
                    </Router>
                  </DashboardContextProvider>
                </LockclassContextProvider>
              </SubjectContextProvider>
            </ClassContextProvider>
          </GradeContextProvider>
        </WeekContextProvider>
      </YearContextProvider>
    </AuthContextProvider>
    //<h1> Vo DUc An</h1>
  );
}

export default App;
