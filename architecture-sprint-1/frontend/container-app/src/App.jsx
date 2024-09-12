import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("auth/Login").catch(() => ({
  default: () => <div className="error">Login component is not available!</div>
})));
const Register = lazy(() => import("auth/Register").catch(() => ({
  default: () => <div className="error">Register component is not available!</div>
})));
const ProtectedRoute = lazy(() => import("auth/ProtectedRoute").catch(() => ({
  default: () => <div className="error">ProtectedRoute component is not available!</div>
})));
const Profile = lazy(() => import("profile/Profile").catch(() => ({
  default: () => <div className="error">Profile component is not available!</div>
})));
const CardMain = lazy(() => import("card/CardMain").catch(() => ({
  default: () => <div className="error">CardMain component is not available!</div>
})));
const EditProfilePopup = lazy(() => import("profile/EditProfilePopup").catch(() => ({
  default: () => <div className="error">EditProfilePopup component is not available!</div>
})));
const EditAvatarPopup = lazy(() => import("profile/EditAvatarPopup").catch(() => ({
  default: () => <div className="error">EditAvatarPopup component is not available!</div>
})));
const AddPlacePopup = lazy(() => import("card/AddPlacePopup").catch(() => ({
  default: () => <div className="error">AddPlacePopup component is not available!</div>
})));
const ImagePopup = lazy(() => import("card/ImagePopup").catch(() => ({
  default: () => <div className="error">ImagePopup component is not available!</div>
})));
const InfoTooltip = lazy(() => import("auth/InfoTooltip").catch(() => ({
  default: () => <div className="error">InfoTooltip component is not available!</div>
})));

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const handleJwtChange = event => {
    setJwt(event.detail);
  }

  useEffect(() => {
    window.addEventListener("jwt-change", handleJwtChange);
    return () => window.removeEventListener("jwt-change", handleJwtChange);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('jwt', token);
    window.dispatchEvent(new CustomEvent('jwt-change', { detail: token }));
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.dispatchEvent(new CustomEvent('jwt-change', { detail: '' }));
  }

  return (
    <Router>
      <div className="page__content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signin" element={
              jwt ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/signup" element={
              jwt ? <Navigate to="/" /> : <Register />
            } />
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={!!jwt}>
                <>
                  <Profile 
                    jwt={jwt} 
                    onLogout={handleLogout}
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                  />
                  <CardMain 
                    jwt={jwt} 
                    onCardClick={setSelectedCard}
                  />
                </>
              </ProtectedRoute>
            } />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={() => setIsEditProfilePopupOpen(false)}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={() => setIsAddPlacePopupOpen(false)}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={() => setIsEditAvatarPopupOpen(false)}
          />
          <ImagePopup
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={() => setIsInfoTooltipOpen(false)}
          />
        </Suspense>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)

export default App;