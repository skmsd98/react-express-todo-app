import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoute from '../routes/ProtectedRoute';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={
                    <ProtectedRoute allow="authenticated">
                        <Main />
                    </ProtectedRoute>
                } />
                <Route exact path="/signin" element={
                    <ProtectedRoute allow="unAuthenticated">
                        <SignIn />
                    </ProtectedRoute>
                } />
                <Route exact path="/signup" element={
                    <ProtectedRoute allow="unAuthenticated">
                        <SignUp />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    )
};