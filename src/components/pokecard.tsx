import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';

interface CardProps {
    index: number,
    sprite: string,
    name: string,
    abilities: object[]
}

export const Pokecard: FC<CardProps> = ({ index, sprite, name, abilities }) => {
    if (abilities.length < 4) {
        console.log(abilities);
        for (let i = abilities.length; i < 4; i++) {
            abilities.push({});
        }
    }
    return (
        <Card key={index} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
                    imageRendering: "pixelated"
                }}
                image={sprite}
            />
            <List>
                {
                    abilities.map((abilityData: object, i) => (
                        <ListItem key={`${index}_${i}`}>
                            <Typography
                                component="div"
                                sx={{ color: "black" }}
                            >
                                {((abilityData) => {
                                    if (abilityData && "ability" in abilityData) {
                                        return "- " + ((abilityData as { ability: object }).ability as { name: string }).name
                                    }

                                    return "";
                                })(abilityData)}
                            </Typography>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    );
};