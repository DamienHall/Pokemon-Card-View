import { FC, useContext } from "react";
import {
  Card,
  CardMedia,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { RosterContext } from "../contexts";

interface CardProps {
  index: number;
  sprite: string;
  name: string;
  abilities: object[];
  inRoster: boolean;
}

export const Pokecard: FC<CardProps> = ({
  index,
  sprite,
  name,
  abilities,
  inRoster,
}) => {
  const rosterContext = useContext(RosterContext)!;

  return (
    <Card
      key={index}
      sx={{ display: "flex", flexDirection: "column", height: "50vh" }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ color: "black", textAlign: "center" }}
      >
        {name}
      </Typography>
      <CardMedia
        component="img"
        sx={{
          imageRendering: "pixelated",
          maxHeight: "50%",
          objectFit: "contain",
        }}
        image={sprite}
      />
      <List
        sx={{
          height: "50%",
        }}
      >
        {abilities.map((abilityData: object, i) => (
          <ListItem key={`${index}_${i}`}>
            <Typography component="div" sx={{ color: "black" }}>
              {((abilityData) => {
                if (abilityData && "ability" in abilityData) {
                  return (
                    "- " +
                    (
                      (abilityData as { ability: object }).ability as {
                        name: string;
                      }
                    ).name
                  );
                }

                return "";
              })(abilityData)}
            </Typography>
          </ListItem>
        ))}
      </List>
      {inRoster ? (
        <Button
          variant="contained"
          sx={{
            margin: "10px",
            alignSelf: "flex-end",
            backgroundColor: "red",
          }}
          onClick={() => {
            rosterContext.setData(
              rosterContext.data.filter((pokemon) => pokemon.name !== name),
            );
          }}
        >
          Remove
        </Button>
      ) : rosterContext.data.length >= 6 ? (
        <Button
          variant="contained"
          sx={{
            margin: "10px",
            alignSelf: "flex-end",
          }}
          disabled
        >
          Add
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            margin: "10px",
            alignSelf: "flex-end",
          }}
          onClick={() => {
            const alreadyInRoster = rosterContext.data.some(
              (pokemon) => pokemon.name === name,
            );
            if (!alreadyInRoster && rosterContext.data.length < 6) {
              rosterContext.setData([
                ...rosterContext.data,
                {
                  index: index,
                  sprite: sprite,
                  name: name,
                  abilities: abilities,
                },
              ]);
            }
          }}
        >
          Add
        </Button>
      )}
    </Card>
  );
};
