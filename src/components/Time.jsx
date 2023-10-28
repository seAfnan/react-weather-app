import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Input,
  Divider,
  List,
  ListItem,
  Text,
  useColorMode,
  Box,
  Center,
  Button,
  Heading,
  Grid,
  GridItem,
  Show,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import states from "../timezones";
import WeatherConditionIcon from "./WeatherConditionIcon";
import SunriseImg from "../assets/day.svg";
import SunsetImg from "../assets/night.svg";

const apiKey = "355c01ca41f42cddb09bdef95828e250";
// localStorage.clear();

function Time() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [cityNames, setCityNames] = useState(() => {
    const storedCityNames = JSON.parse(localStorage.getItem("weather_cities"));
    return storedCityNames ? storedCityNames : ["Islamabad"];
  });
  const [timeData, setTimeData] = useState([]);
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
        const getReturnData = await getCityDataApi(city);
        console.log(getReturnData);
        // if (getReturnData != null) {
        //   setCityNames([...cityNames, city]);
        //   setTimeData([...timeData, getReturnData]);
        // }
        inputRef.current.focus();
      }
      setIsLoading(false); // Set loading to false after API call
    }
  };

  async function getCityDataApi(city) {
    try {
      const response = await axios.get(
        `https://timeapi.io/api/Time/current/zone?timeZone=${city}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  async function runCityLoop() {
    if (cityNames != null) {
      // Create a copy of the current timeData
      setIsLoading(true);
      setSearchTerm(isLoading ? loadingPlaceholder : "");
      const newTimeData = [...timeData];
      for (let index = 0; index < cityNames.length; index++) {
        try {
          const data = await getCityDataApi(cityNames[index]);
          if (data != null) {
            newTimeData.push(data);
          }
        } catch (error) {
          console.error(
            "Error fetching weather data for city",
            cityNames[index],
            error
          );
        }
      }
      // Update the state with the newTimeData array
      setIsLoading(false);
      setTimeData(newTimeData);
    }
  }
  useEffect(() => {
    // runCityLoop(); // Run the loop when the component mounts
  }, []); // The empty dependency array ensures this runs once

  const removeWeatherCity = (index) => {
    const newTimeData = [...timeData];
    const newCityNames = [...cityNames];
    newTimeData.splice(index, 1); // Remove the city data at the specified index
    newCityNames.splice(index, 1); // Remove the city name at the specified index
    setTimeData(newTimeData);
    setCityNames(newCityNames);
  };

  return (
    <Box w="100%" color="white">
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
    </Box>
  );
}

export default Time;
