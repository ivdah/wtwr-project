import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData = {} }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isDay = weatherData?.isDay ?? true;
  const condition = (weatherData?.condition || "clear").toLowerCase();

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === isDay && option.condition === condition;
  });

  const weatherOption =
    filteredOptions[0] || defaultWeatherOptions[isDay ? "day" : "night"];
  const tempText = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const timeLabel = isDay ? "day" : "night";
  const altText = `Weather illustration for ${timeLabel} ${weatherOption?.condition || "default"} conditions`;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {tempText} &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        className="weather-card__image"
        alt={altText}
      />
    </section>
  );
}

export default WeatherCard;
