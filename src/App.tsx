import './App.css';
import { useState, useEffect } from 'react';

import { Pokecard } from './components/pokecard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

async function getPokemonData(limit: number) {
  const pokemon = (await (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)).json()).results;
  const pokemonData = [];

  for (const entry of pokemon) {
    pokemonData.push(await (await fetch(entry.url)).json());
  }

  return pokemonData;
}

export function App() {
  const [pokemonData, setPokemonData] = useState<object[]>([]);

  useEffect(() => {
    getPokemonData(60).then(data => {
      setPokemonData(data);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ color: "White", textAlign: "center", marginTop: "80px" }}
      >
        Multiverse Pokedex
      </Typography>
      <Grid container spacing={2} columns={12} margin={10}>
        {
          pokemonData.map((data, index) => 
          <Grid key={index} size={{ xs: 12, sm: 6, md: 2 }}>
              <Pokecard
                index={index}
                sprite={((data: object) => {
                  if (data && "sprites" in data && "front_default" in (data.sprites as object)) {
                    return ((data as { sprites: object }).sprites as { front_default: string }).front_default;
                  }

                  return "";
                })(data)}
                name={((data: object) => {
                  if (data && "species" in data && "name" in (data.species as object)) {
                    return ((data as { species: object }).species as { name: string }).name;
                  }

                  return "";
                })(data)}
                abilities={((data: object) => {
                  if (data && "abilities" in data) {
                    return (data as { abilities: object[] }).abilities;
                  }

                  return [];
                })(data)}
              />
          </Grid>
        )}
      </Grid>
      <h1>Footer</h1>
    </Box>
  );
}
