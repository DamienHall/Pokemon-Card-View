import { FC, useContext } from "react";

import { Pokecard } from "./pokecard";
import { Box, Typography, Grid } from "@mui/material";
import { RosterContext } from "../contexts";

export const Roster: FC = () => {
  const rosterContext = useContext(RosterContext)!;

  return (
    <Box>
      <Typography
        variant="h3"
        component="div"
        sx={{ color: "White", textAlign: "center", marginTop: "80px" }}
      >
        Poke Roster
      </Typography>
      <Grid container spacing={2} columns={12} margin={10}>
        {rosterContext.data.map((data, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 2 }}>
            <Pokecard
              index={data.index}
              sprite={data.sprite}
              name={data.name}
              abilities={data.abilities}
              inRoster={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
