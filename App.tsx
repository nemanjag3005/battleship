import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Game from "./Components/Game/Game";

export default function App() {
  const handleLogIn = () => {};
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
