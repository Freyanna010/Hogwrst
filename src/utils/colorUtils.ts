import { hogwartsTheme } from "@/styles/theme";

export const getHouseColor = (house: string) => {
  switch (house) {
    case "Gryffindor":
      return hogwartsTheme.token.colorGryffindor;
    case "Slytherin":
      return hogwartsTheme.token.colorSlytherin;
    case "Ravenclaw":
      return hogwartsTheme.token.colorRavenclaw;
    case "Hufflepuff":
      return hogwartsTheme.token.colorHufflepuff;
    default:
      return hogwartsTheme.token.colorPrimary;
  }
};
