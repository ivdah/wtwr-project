export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    condition: "default",
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    day: false,
    condition: "default",
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 38.890759,
  longitude: -77.084747,
};

export const apiKey = "f54dff4570e057bd297fd67b8dc2c1a2";
