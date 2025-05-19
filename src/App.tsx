import "./App.css";
import { Pokedex, Roster } from "./components";
import { DataContextProvider } from "./contexts/DataContext";
import { RosterContextProvider } from "./contexts/RosterContext";
import Box from "@mui/material/Box";

export function App() {
  return (
    <Box display="flex" flexDirection="column">
      <DataContextProvider>
        <RosterContextProvider>
          <Roster />
          <Pokedex />
        </RosterContextProvider>
      </DataContextProvider>
      <h1>Footer</h1>
    </Box>
  );
}
