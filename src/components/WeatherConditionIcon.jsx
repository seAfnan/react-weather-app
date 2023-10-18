import React from "react";
import { Image, useColorMode } from "@chakra-ui/react";
import FewCloudsImg from "../assets/few_clouds.svg";

import ClearSkyImgDark from "../assets/clear_sky_dark.svg";
import ScatteredCloudsImgDark from "../assets/scattered_clouds_dark.svg";
import BrokenCloudsImgDark from "../assets/broken_clouds_dark.svg";
import ShowerRainImgDark from "../assets/shower_rain_dark.svg";
import RainImgDark from "../assets/rain_dark.svg";
import ThunderstormImgDark from "../assets/thunderstorm_dark.svg";
import SnowImgDark from "../assets/snow_dark.svg";
import MistImgDark from "../assets/mist_dark.svg";

import ClearSkyImgLight from "../assets/clear_sky_light.svg";
import ScatteredCloudsImgLight from "../assets/scattered_clouds_light.svg";
import BrokenCloudsImgLight from "../assets/broken_clouds_light.svg";
import ShowerRainImgLight from "../assets/shower_rain_light.svg";
import RainImgLight from "../assets/rain_light.svg";
import ThunderstormImgLight from "../assets/thunderstorm_light.svg";
import SnowImgLight from "../assets/snow_light.svg";
import MistImgLight from "../assets/mist_light.svg";

function WeatherConditionIcon(props) {
  const { colorMode } = useColorMode();

  const lightWeatherConditionIcon = (param) => {
    switch (param) {
      case "clear sky":
        return ClearSkyImgLight;
      case "few clouds":
      case "few clouds: 11-25%":
        return FewCloudsImg;
      case "scattered clouds":
      case "scattered clouds: 25-50%":
        return ScatteredCloudsImgLight;
      case "broken clouds":
      case "overcast clouds: 85-100%":
      case "broken clouds: 51-84%":
        return BrokenCloudsImgLight;
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
        return ShowerRainImgLight;
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
        return RainImgLight;
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
        return ThunderstormImgLight;
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
        return SnowImgLight;
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
        return MistImgLight;
      default:
        return "";
    }
  };
  const darkWeatherConditionIcon = (param) => {
    switch (param) {
      case "clear sky":
        return ClearSkyImgDark;
      case "few clouds":
      case "few clouds: 11-25%":
        return FewCloudsImg;
      case "scattered clouds":
      case "scattered clouds: 25-50%":
        return ScatteredCloudsImgDark;
      case "broken clouds":
      case "overcast clouds: 85-100%":
      case "broken clouds: 51-84%":
        return BrokenCloudsImgDark;
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
        return ShowerRainImgDark;
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
        return RainImgDark;
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
        return ThunderstormImgDark;
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
        return SnowImgDark;
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
        return MistImgDark;
      default:
        return "";
    }
  };

  return (
    <>
      <Image
        src={
          colorMode == "dark"
            ? darkWeatherConditionIcon(props.weatherCondition)
            : lightWeatherConditionIcon(props.weatherCondition)
        }
        width={["100%", "100%", "100%", "100%", "100%"]}
        // maxW={["20%", "20%", "30%", "40%", "50%"]}
      />
    </>
  );
}

export default WeatherConditionIcon;
