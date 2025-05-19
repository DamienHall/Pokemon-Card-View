import { FC, useContext } from "react";
import { Pokecard } from "./pokecard";
import { Box, Typography, Grid } from "@mui/material";
import { DataContext, RosterContext } from "../contexts";

export const Pokedex: FC = () => {
  const dataContext = useContext(DataContext)!; // { data: object[], setData: Function }
  const rosterContext = useContext(RosterContext)!;

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography
        variant="h3"
        component="div"
        sx={{ color: "White", textAlign: "center", marginTop: "80px" }}
      >
        Pokedex
      </Typography>
      <Grid container spacing={2} columns={12} margin={10}>
        {dataContext.data.map((data, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 2 }}>
            <Pokecard
              index={data.index}
              sprite={data.sprite}
              name={data.name}
              abilities={data.abilities}
              inRoster={rosterContext.data.some(pokemon => pokemon.name === data.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
