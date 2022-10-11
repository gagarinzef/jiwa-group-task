import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonList from "../components/PokemonList";

export default function Home({ navigation }) {
  const animation = useRef(null);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setLoop(false), 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: loop ? "#1CABE2" : "white" },
      ]}
    >
      {loop ? (
        <LottieView
          autoPlay
          loop={loop}
          ref={animation}
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#1CABE2",
          }}
          source={require("../../assets/splash-screen.json")}
        />
      ) : (
        <>
          <NavBar />
          <View
            style={{
              flex: 4,
              width: "100%",
              padding: 10,
            }}
          >
            <PokemonList navigation={navigation} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    backgroundColor: "#1CABE2",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
