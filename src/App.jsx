import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useState, createContext, useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import LoadingScreen from "./components/organisms/LoadingScreen";

export const CurrentUserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for the authentication state changes
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
            if (user && !loading && window.location.pathname === '/log-in') {
                window.location.pathname = '/dashboard';
            }
        });

        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
    }, [user, loading, navigate]);

    const ProtectedRoute = ({children}) => {
        if (!user && loading) {
            return (
                <LoadingScreen />
            )
        } else if (!user && !loading) {
            console.log(`redirecting to login`)
            return <Navigate to={'/log-in'} replace />;
        } else {
            return children;
        }
    };

    return (
        <CurrentUserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path={'/'} element={<Navigate to={'log-in'} />} />

                <Route path={'/dashboard'} element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />

                <Route path={'/log-in'} element={<LoginPage />} />
                <Route path={'/sign-up'} element={<SignupPage />} />
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
