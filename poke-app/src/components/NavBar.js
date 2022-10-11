import { View, Text, Image, StyleSheet } from "react-native";
import pokeball from "../../assets/pokeball.png";

export default function NavBar() {
  return (
    <View style={styles.bgNav}>
      <View style={{ flex: 3 }}>
        <Text style={styles.textNav}>PokeApp</Text>
      </View>
      <View style={styles.bgImg}>
        <Image source={pokeball} style={styles.img} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgNav: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#343231",
    width: "100%",
    alignItems: "center",
  },
  textNav: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 60,
    marginTop: 40,
  },
  bgImg: {
    backgroundColor: "#343231",
    flex: 1,
    display: "flex",
    marginTop: 30,
  },
  img: {
    width: "70%",
    height: "50%",
    resizeMode: "cover",
    marginTop: 15,
  },
});
