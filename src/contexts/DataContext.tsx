import { useState, createContext, FC, ReactNode, useEffect } from "react";

interface Pokemon {
    index: number,
    sprite: string,
    name: string,
    abilities: object[]
}

interface DataContextType {
  data: Pokemon[];
  setData: Function;
}

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export const DataContextProvider: FC<DataContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Pokemon[]>([]);

  async function fetchData(limit: number) {
    const pokemon = (
      await (
        await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      ).json()
    ).results;
    const pokemonData = [];

    for (let i = 0; i < pokemon.length; i++) {
        const json = await (await fetch(pokemon[i].url)).json();
        pokemonData.push({ index: i, sprite: json.sprites.front_default, name: json.name, abilities: json.abilities });
    }

    return pokemonData;
  }

  useEffect(() => {
    console.log("Fetching Pokemon Data");
    fetchData(60).then((data) => {
        setData(data);
    })
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
