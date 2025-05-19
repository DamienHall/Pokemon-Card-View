import { createContext, FC, ReactNode, useState } from "react";

interface Pokemon {
    index: number,
    sprite: string,
    name: string,
    abilities: object[]
}

interface RosterContextType {
  data: Pokemon[];
  setData: Function;
}

interface RosterContextProviderProps {
  children: ReactNode;
}

export const RosterContext = createContext<RosterContextType | undefined>(
  undefined,
);

export const RosterContextProvider: FC<RosterContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Pokemon[]>([]);

  return (
    <RosterContext.Provider value={{ data, setData }}>
      {children}
    </RosterContext.Provider>
  );
};
