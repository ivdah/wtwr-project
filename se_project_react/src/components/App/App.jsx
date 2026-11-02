import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  addCardLike,
  addItem,
  getItems,
  removeCardLike,
  removeItem,
} from "../../utils/api";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  authorize,
  getUserInfo,
  register,
  updateUserInfo,
} from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleLogin = (inputValues, handleReset) => {
    setIsLoading(true);
    authorize(inputValues)
    .then((res) => {
      if (!res.token) throw new Error("No token received");
      localStorage.setItem("jwt", res.token);
      return getUserInfo(res.token);
    })
    .then((user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeActiveModal();
      handleReset();
    })
    .catch((console.error))
    .finally(() => {
      setIsLoading(false);
    });
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
        if (!res.token) throw new Error("No token received");
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((console.error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const handleEditProfile = (userData) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Cannot update profile without an access token");
      return;
    }

    setIsLoading(true);
    updateUserInfo(userData, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Cannot update item like without an access token");
      return;
    }

    const updateLike = isLiked ? removeCardLike : addCardLike;
    updateLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            String(item._id) === String(id) ? updatedCard : item,
          ),
        );
        setSelectedCard((card) =>
          String(card._id) === String(id) ? updatedCard : card,
        );
      })
      .catch(console.error);
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
        setClothingItems((previousItems) =>
          previousItems.filter((item) => item._id !== itemId),
        );
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
          console.error(error);
          localStorage.removeItem("jwt");
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
          isLoggedIn={isLoggedIn}
          weatherData={weatherData}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogout={handleLogout}
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
                onCardLike={handleCardLike}
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
                onEditProfileClick={handleEditProfileClick}
                onCardLike={handleCardLike}
                onLogout={handleLogout}
              />
            </ProtectedRoute>}
          />
        </Routes>

        <Footer />
        <EditProfileModal
          onClose={closeActiveModal}
          isOpen={activeModal === "edit-profile"}
          onEditProfile={handleEditProfile}
          currentUser={currentUser}
          isLoading={isLoading}
        />  
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          isLoading={isLoading}
        />
        <RegisterModal
          onClose={closeActiveModal}
          isOpen={activeModal === "register"}
          onRegister={handleRegister}
          isLoading={isLoading}
          onLoginClick={handleLoginClick}
        />
        <LoginModal
          onClose={closeActiveModal}
          isOpen={activeModal === "login"}
          onLogin={handleLogin}
          isLoading={isLoading}
          onRegisterClick={handleRegisterClick}
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
