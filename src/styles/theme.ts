export type ThemeToken = Record<string, string>;
export type ComponentStyles = Record<string, Record<string, string | number>>;

export interface Theme {
  token: ThemeToken;
}

export const hogwartsTheme: Theme = {
  token: {
    colorPrimary: "#141414",
    color: "#fdffdc",
    shadow: "0px 0px 10px 1.5px rgba(250, 255, 151, 0.921)",
    border: "1.5px solid #fdffdc",
    colorGryffindor: "#5c0011",
    colorSlytherin: "#092b00",
    colorRavenclaw: "#001d66",
    colorHufflepuff: "#614700",
    fontFamily: "Spectral",
    borderRadius: "2px",
  },
};
