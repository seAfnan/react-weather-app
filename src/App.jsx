import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Weather from "./components/Weather";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="main">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              <Heading as="h4" size="md">
                Weather
              </Heading>
            </Tab>
            <Tab>
              <Heading as="h4" size="md">
                Time
              </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Weather />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  );
}

export default App;
