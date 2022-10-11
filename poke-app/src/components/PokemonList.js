import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../store/actions";
import axios from "axios";

export default function PokemonList({ navigation }) {
  const [text, onChangeText] = useState("");
  const dispatch = useDispatch();
  const { pokemons, next } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState("");

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

  const search = async () => {
    if (text) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`
        );
        setResult(response.data);
        setSearching(true);
        setFound(true);
      } catch (error) {
        setResult("");
        setSearching(true);
        setFound(false);
      }
    } else {
      setSearching(false);
    }
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

  const RenderSearch = () => {
    if (!result) {
      return (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
            color: "#1f2937",
          }}
        >
          Pokemon not found
        </Text>
      );
    } else {
      return (
        <Pressable
          onPress={() =>
            getItem({ url: `https://pokeapi.co/api/v2/pokemon/${result.id}` })
          }
        >
          <View style={styles.cardList}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {result.name.charAt(0).toUpperCase() + result.name.slice(1)}
            </Text>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`,
              }}
              style={styles.imageList}
            />
          </View>
        </Pressable>
      );
    }
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#0ea5e9",
            marginVertical: 20,
            borderRadius: 5,
            height: 40,
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              marginTop: 3,
              fontSize: 16,
              fontWeight: "500",
              marginTop: 10,
            }}
            onPress={() => {
              setSearching(false);
              onChangeText("");
            }}
          >
            All
          </Text>

          <TextInput
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={search}
            placeholder="Search pokemon..."
            style={{
              flex: 6,
              backgroundColor: "white",
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>
        {searching ? (
          <RenderSearch />
        ) : (
          <FlatList
            data={pokemons}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={ItemView}
            ListFooterComponent={renderFooter}
          />
        )}
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
    marginTop: 20,
    marginLeft: 5,
  },
  bgList: {
    flex: 1,
    backgroundColor: "#d1d5db",
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 15,
  },
});
