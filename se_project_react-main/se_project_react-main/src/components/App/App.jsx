import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, getItems, removeItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  authorize,
  getUserInfo,
  register,
  updateUserInfo,
} from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "" },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleLogin = (credentials, handleReset) => {
    setIsLoading(true);
    authorize(credentials)
      .then((res) => {
        if (!res.token) throw new Error("The server did not return an access token");
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        handleReset();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (userData, handleReset) => {
    setIsLoading(true);
    register(userData)
      .then(() => {
        closeActiveModal();
        handleReset();
        return authorize({ email: userData.email, password: userData.password });
      })
      .then((res) => {
        if (!res.token) throw new Error("The server did not return an access token");
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleEditProfile = (userData) => {
    setIsLoading(true);
    updateUserInfo(userData, localStorage.getItem("jwt"))
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddItem = (inputValues, handleReset) => {
    setIsLoading(true);
    const newCardData = {
      _id: Date.now(),
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    addItem(newCardData, localStorage.getItem("jwt"))
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
        handleReset();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const deleteItemHandler = (itemId) => {
    removeItem(itemId, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      }) 
      .catch(console.error);
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          console.error(error);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogout={() => {
            localStorage.removeItem("jwt");
            setCurrentUser(null);
            setIsLoggedIn(false);
          }}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                onAddItem={handleAddItem}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleAddClick={handleAddClick}
                currentUser={currentUser}
                onEditProfileClick={handleEditProfileClick}
              />
            </ProtectedRoute>}
          />
        </Routes>

        <Footer />
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          isLoading={isLoading}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onRegister={handleRegister}
          onClose={closeActiveModal}
          onLoginClick={handleLoginClick}
          isLoading={isLoading}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onLogin={handleLogin}
          onClose={closeActiveModal}
          onRegisterClick={handleRegisterClick}
          isLoading={isLoading}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onEditProfile={handleEditProfile}
          onClose={closeActiveModal}
          currentUser={currentUser}
          isLoading={isLoading}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          deleteItemHandler={deleteItemHandler}
        />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
