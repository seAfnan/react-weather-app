import React from "react";
import { Image, useColorMode, Text, Box, Heading } from "@chakra-ui/react";

import FewCloudsImg from "../assets/few-clouds.svg";
import ClearSkyImg from "../assets/clear-sky.svg";
import CloudsImg from "../assets/few-clouds.svg";
import ShowerRainImg from "../assets/shower-rain.svg";
import RainImg from "../assets/rain.svg";
import ThunderstormImg from "../assets/thunderstrom.svg";
import SnowImg from "../assets/snowy.svg";
// import MistImg from "../assets/mist.svg";

function WeatherConditionIcon(props) {
  const { colorMode } = useColorMode();

  const weatherIcon = (param) => {
    switch (param) {
      case "clear sky":
        return ClearSkyImg;
      case "few clouds":
        return CloudsImg;
      case "scattered clouds":
        return CloudsImg;
      case "broken clouds":
      case "overcast clouds":
      case "broken clouds":
        return CloudsImg;
      case "shower rain":
      case "light intensity drizzle":
      case "drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
        return ShowerRainImg;
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "freezing rain":
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        return RainImg;
      case "thunderstorm":
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        return ThunderstormImg;
      case "snow":
      case "light snow":
      case "heavy snow":
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        return SnowImg;
      case "mist":
      case "smoke":
      case "haze":
      case "sand/dust whirls":
      case "fog":
      case "sand":
      case "dust":
      case "volcanic ash":
      case "squalls":
      case "tornado":
        return MistImg;
      default:
        return "";
    }
  };

  return (
    <>
      {/* <Heading>{props.city}</Heading> */}
      <Image
        textAlign="center"
        alignItems="center"
        // border="1px"
        // borderColor="red"
        src={
          weatherIcon(props.weatherCondition)
          // colorMode == "dark"
          // ? darkWeatherConditionIcon(props.weatherCondition)
          // : lightWeatherConditionIcon(props.weatherCondition)
        }
        width={["100%", "100%", "100%", "100%", "50%"]}
        p="0px"
      />
      {/* <Text>{props.weatherCondition}</Text> */}
    </>
  );
}

export default WeatherConditionIcon;
