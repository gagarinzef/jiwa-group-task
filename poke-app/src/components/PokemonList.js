import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../store/actions";

export default function PokemonList({ navigation }) {
  const dispatch = useDispatch();
  const { pokemons, next } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPokemons("https://pokeapi.co/api/v2/pokemon/")).then(() => {
      setLoading(false);
    });
  }, []);

  const getData = () => {
    dispatch(fetchPokemons(next)).then(() => {
      setLoading(false);
    });
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({ item }) => {
    const id = item.url.split("/")[6];
    return (
      <Pressable onPress={() => getItem(item)}>
        <View style={styles.cardList}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }}
            style={styles.imageList}
          />
        </View>
      </Pressable>
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    navigation.navigate("Detail", {
      url: item.url,
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.bgList}>
        <Text style={styles.title}>Pokemon List</Text>
        <FlatList
          data={pokemons}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  loadMoreBtn: {
    padding: 15,
    backgroundColor: "#0ea5e9",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  imageList: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    right: "-30%",
  },

  cardList: {
    backgroundColor: "#991b1b",
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 45,
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    color: "#1f2937",
    fontWeight: "800",
    fontSize: 24,
    marginVertical: 20,
    marginLeft: 20,
  },
  bgList: {
    flex: 1,
    backgroundColor: "#d1d5db",
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 15,
  },
});
