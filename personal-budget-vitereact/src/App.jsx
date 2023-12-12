import React, { useState, useEffect } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import BudgetsPage from "./pages/BudgetsPage";
import ExpensesPage from "./pages/ExpensesPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "./context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  palette: {
    primary: {
      main: '#2196f3', // Blue
      contrastText: '#fff', // White text on primary
    },
    secondary: {
      main: '#ff5722', // Deep Orange
      contrastText: '#fff', // White text on secondary
    },
    background: {
      default: '#f8f8f8', // Light Grey
      paper: '#fff', // White
    },
    text: {
      primary: '#333', // Dark Grey
      secondary: '#666', // Medium Grey
    },
    success: {
      main: '#4caf50', // Green
    },
    error: {
      main: '#f44336', // Red
    },
    warning: {
      main: '#ff9800', // Amber
    },
    info: {
      main: '#2196f3', // Blue
    },
  },
});


function App() {
  const { isAuthenticated, logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    let timer;

    if (token) {
      const expirationTime = new Date().getTime() + 60000; 
      const remaining = expirationTime - new Date().getTime();
      console.log(expirationTime, new Date().getTime(), remaining);
      setRemainingTime(remaining);

      timer = setInterval(() => {
        const remaining = expirationTime - new Date().getTime();
        setRemainingTime(remaining);

        if (remaining <= 20000) {
          console.log("timer called");
          setShowDialog(true);
        }
      }, 1000); // Update remaining time every second

      if (remainingTime < 0) {
        navigate('/login');
        localStorage.clear()
      }
      return () => clearInterval(timer);
    }
  }, [token]);

  const handleStayLoggedIn = async () => {
    // Handle user choosing to stay logged in
    if (remainingTime < 60000) {
      // Implement any necessary actions to refresh the token or extend the session
      const response = await fetch("http://52.203.126.57:3000/users/refreshToken", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response);
      const newToken = response.token;
      localStorage.removeItem('token');

      localStorage.setItem("token", newToken);
      setShowDialog(false);
      console.log("Token refreshed", showDialog);
    } else {
      setShowDialog(false);
      navigate("/login");
      alert("Error refreshing token. Redirect to login page");
      setShowDialog(false);
    }
  };

  const handleLogout = () => {
    // Handle user choosing to logout
    setShowDialog(false);
    logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {showDialog && remainingTime > 0 (
          <Dialog
            open={showDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Want to Stay Logged in?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your session will expire in {Math.floor(remainingTime / 1000)}{" "}
                seconds. Click Stay Logged in or Refresh the screen to stay
                here.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleStayLoggedIn}>Stay Logged in</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>

      <Menu />
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/Budgets" element={<BudgetsPage />} />
              <Route path="/Expenses" element={<ExpensesPage />} />
            </>
          ) : (
            <Route path="/login" element={<LoginPage />} />
          )}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
