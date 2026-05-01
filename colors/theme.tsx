const Colors = {
  primary: "#05387af6",
  secondary: "#BD490F",
  terciary: "#086B21",
  text: "#fff",
  textMuted: "#ddd",
};

function AppColors(type: "Primary" | "Secondary" | "Terciary") {
  switch (type) {
    case "Primary":
      return Colors.primary;
      break;
    case "Secondary":
      return Colors.secondary;
      break;
    case "Terciary":
      return Colors.terciary;
  }
}

export default AppColors