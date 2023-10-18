import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Input,
  Divider,
  List,
  ListItem,
  Text,
  useColorMode,
  Flex,
  Box,
  Center,
  ButtonGroup,
  Button,
  Heading,
  Square,
  Grid,
  GridItem,
  Show,
  Image,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  WarningIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import states from "../cities";
import WeatherConditionIcon from "./WeatherConditionIcon";
import SunriseImg from "../assets/sunrise.svg";
import SunsetImg from "../assets/sunset.svg";

const apiKey = "355c01ca41f42cddb09bdef95828e250";
// localStorage.clear();

function Weather() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [cityNames, setCityNames] = useState(
    JSON.parse(localStorage.getItem("weather_cities"))
  );
  const [weatherData, setWeatherData] = useState([]);
  const { colorMode } = useColorMode();
  const suggestionsRef = useRef(null);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const loadingPlaceholder = "Fetching data...";

  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cityNames));
  }, [cityNames]);

  useEffect(() => {
    // Add a global click event listener to close suggestions when clicking outside
    window.addEventListener("click", closeSuggestions);
    return () => {
      window.removeEventListener("click", closeSuggestions);
    };
  }, []);

  const closeSuggestions = (event) => {
    if (searchTerm) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setFilteredData([]);
      }
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    const filteredResults = states.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    // Limit the displayed suggestions to a maximum of 7
    setFilteredData(filteredResults.slice(0, 7));
  };

  const handleSelect = async (city) => {
    if (searchTerm) {
      setIsLoading(true); // Set loading to true
      setSearchTerm(isLoading ? loadingPlaceholder : "");
      setFilteredData([]); // Clear the suggestions list
      if (cityNames.includes(city) == false) {
        // Make an API call with the selected city
        setCityNames([...cityNames, city]);
        setWeatherData([...weatherData, await getCityDataApi(city)]);
        inputRef.current.focus();
      }
      setIsLoading(false); // Set loading to false after API call
    }
  };

  async function getCityDataApi(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function runCityLoop() {
    // Create a copy of the current weatherData
    setIsLoading(true);
    setSearchTerm(isLoading ? loadingPlaceholder : "");
    const newWeatherData = [...weatherData];
    for (let index = 0; index < cityNames.length; index++) {
      try {
        const data = await getCityDataApi(cityNames[index]);
        newWeatherData.push(data);
      } catch (error) {
        console.error(
          "Error fetching weather data for city",
          cityNames[index],
          error
        );
      }
    }
    // Update the state with the newWeatherData array
    setIsLoading(false);
    setWeatherData(newWeatherData);
  }
  useEffect(() => {
    runCityLoop(); // Run the loop when the component mounts
  }, []); // The empty dependency array ensures this runs once

  const removeWeatherCity = (index) => {
    const newWeatherData = [...weatherData];
    const newCityNames = [...cityNames];
    newWeatherData.splice(index, 1); // Remove the city data at the specified index
    newCityNames.splice(index, 1); // Remove the city name at the specified index
    setWeatherData(newWeatherData);
    setCityNames(newCityNames);
  };

  const calculateSunriseTime = (time) => {
    let riseTime = new Date(parseInt(time) * 1000);
    if (riseTime.getMinutes() < 10) {
      return `${riseTime.getHours()}:0${riseTime.getMinutes()}`;
    } else {
      return `${riseTime.getHours()}:${riseTime.getMinutes()}`;
    }
  };
  const calculateSunsetTime = (time) => {
    let setTime = new Date(parseInt(time) * 1000);
    let hours = setTime.getHours();
    if (hours > 12) {
      hours -= 12;
    }
    if (setTime.getMinutes() < 10) {
      return `${hours}:0${setTime.getMinutes()}`;
    } else {
      return `${hours}:${setTime.getMinutes()}`;
    }
  };

  return (
    <Box w="100%" p={4} color="white">
      <Container>
        <Input
          placeholder={isLoading ? loadingPlaceholder : "Search City"}
          border="1px"
          borderColor="gray.200"
          autoFocus
          value={searchTerm}
          onChange={handleSearch}
          ref={inputRef}
        />
        <Divider />
        <div ref={suggestionsRef}>
          {filteredData.length > 0 && (
            <List
              spacing={1}
              bgColor={colorMode === "dark" ? "gray.800" : "white"} // Adjust background color for dark mode
              color={colorMode === "dark" ? "white" : "black"} // Adjust text color for dark mode
              boxShadow="md" // Add a shadow to the suggestions box
              borderRadius="md" // Add some border radius
              p={2} // Padding
              border="1px" // Add a border
              borderColor="gray.300" // Border color
              position="absolute" // Position it absolutely
              zIndex={9999} // Ensure it's above other elements
            >
              {filteredData.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleSelect(item)}
                  cursor="pointer"
                  _hover={{
                    backgroundColor:
                      colorMode === "dark" ? "gray.600" : "gray.100", // Adjust hover background color
                  }}
                  p={2} // Padding
                  borderRadius="md" // Add some border radius to list items
                >
                  <Text>{item}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Container>
      {weatherData &&
        weatherData.map((key, index) => (
          <Grid
            textAlign="center"
            alignItems="center"
            // border="1px"
            // borderColor="white"
            pb="10px"
            bg="#232834"
            pl={["1px", "15px", "15px", "15px", "15px"]}
            pr="25px"
            mt="20px"
            templateColumns={{
              base: "repeat(4, 1fr)", // Single column on small screens
              sm: "repeat(4, 1fr)", // Two columns on screens of width 30em (480px) and up
              md: "repeat(4, 1fr)", // Three columns on screens of width 48em (768px) and up
              lg: "repeat(4, 1fr)", // Five columns on screens of width 62em (992px) and up
            }}
            gap={1}
            key={index}
          >
            <GridItem w="100%">
              <HStack>
                {/* <WeatherConditionIcon
                    weatherCondition={key.weather[0].description}
                  /> */}
                <Heading
                  pl={["1px", "15px", "15px", "15px", "15px"]}
                  fontSize={["lg", "xl", "2xl", "3xl", "5xl"]}
                >
                  {key.name}
                </Heading>
              </HStack>
            </GridItem>
            <GridItem w="100%">
              <Heading fontSize={["xl", "2xl", "3xl", "4xl", "6xl"]}>
                {(key.main.temp - 273.15).toFixed(1)}&#176;c
                {/* <Text fontSize={["sm", "md", "lg", "xl", "2xl"]}>
                    {(
                      ((parseFloat(key.main.temp) - 273.15) * 9) / 5 +
                      32
                    ).toFixed(1)}
                    &deg;F
                  </Text> */}
              </Heading>
              <Heading
                fontSize={["sm", "lg", "xl", "2xl", "2xl"]}
                marginTop={["5px", "10px", "15px", "15px", "20px"]}
              >
                <ArrowUpIcon />
                {(key.main.temp_max - 273.15).toFixed(0)}&#176;c
                <ArrowDownIcon
                  marginLeft={["5px", "10px", "15px", "20px", "25px"]}
                />
                {(key.main.temp_min - 273.15).toFixed(0)}&#176;c
              </Heading>
            </GridItem>
            <GridItem w="100%">
              <VStack>
                <HStack>
                  <Image
                    src={SunriseImg}
                    maxW={["50%", "50%", "60%", "80%", "100%"]}
                  />
                  <Text
                    pl={["1px", "15px", "15px", "15px", "15px"]}
                    fontSize={["lg", "xl", "2xl", "3xl", "2xl"]}
                  >
                    {calculateSunriseTime(key.sys.sunrise)}
                    <small>AM</small>
                  </Text>
                </HStack>
                <HStack>
                  <Image
                    src={SunsetImg}
                    maxW={["50%", "50%", "60%", "80%", "100%"]}
                  />
                  <Text
                    pl={["1px", "15px", "15px", "15px", "15px"]}
                    fontSize={["lg", "xl", "2xl", "3xl", "2xl"]}
                  >
                    {calculateSunsetTime(key.sys.sunset)}
                    <small>PM</small>
                  </Text>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem
              textAlign={["right", "right", "right", "right", "center"]}
              w="100%"
            >
              <Button
                onClick={() => removeWeatherCity(index)}
                size={["xs", "sm", "sm", "md", "lg"]}
                bg="red"
              >
                <DeleteIcon />
              </Button>
            </GridItem>
            {/* <Show above="lg">
                <GridItem w="100%" h="10" bg="blue.500">
                  this is one
                </GridItem>
              </Show> */}
          </Grid>
        ))}
    </Box>
  );
}

export default Weather;
