import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon, fetchPokemonSpecies } from "../store/actions";
import NavBar from "../components/NavBar";

export default function Detail({ route, navigation }) {
  const { url } = route.params;
  const dispatch = useDispatch();
  const { pokemon, pokemonSpecies } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPokemon(url));
  }, []);

  useEffect(() => {
    if (pokemon?.species?.url) {
      dispatch(fetchPokemonSpecies(pokemon?.species?.url)).then(() => {
        setLoading(false);
      });
    }
  }, [pokemon]);

  const evolve = async () => {
    try {
      const response = await axios.get(pokemonSpecies.evolution_chain.url);
      let chain = [
        response.data.chain.species.name,
        response.data.chain.evolves_to[0].species.name,
      ];
      if (response?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name) {
        chain.push(
          response.data.chain.evolves_to[0].evolves_to[0].species.name
        );
      }
      chain.forEach((el, idx) => {
        if (pokemon.name === el) {
          if (chain[idx + 1]) {
            navigation.push("Detail", {
              url: `https://pokeapi.co/api/v2/pokemon/${chain[idx + 1]}`,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <NavBar />
        <View style={{ flex: 4, width: "100%", paddingHorizontal: 10 }}>
          <Text style={styles.title}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: pokemon.sprites.other["official-artwork"].front_default,
                }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <View
              style={{
                flex: 1.5,
                width: "100%",
              }}
            >
              <Text style={styles.biodata}>Bio</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                }}
              >
                <View style={{ flex: 1, width: "100%" }}>
                  <Text style={styles.bioTitle}>Name:</Text>
                  <Text style={styles.bio}>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </Text>
                  <Text
                    style={[
                      styles.bioTitle,
                      {
                        marginTop: 25,
                      },
                    ]}
                  >
                    Height:
                  </Text>
                  <Text style={styles.bio}>{pokemon.height} dm</Text>
                  <Text
                    style={[
                      styles.bioTitle,
                      {
                        marginTop: 25,
                      },
                    ]}
                  >
                    Type:
                  </Text>
                  <Text style={styles.bio}>
                    {pokemon.types[0].type.name.charAt(0).toUpperCase() +
                      pokemon.types[0].type.name.slice(1)}
                  </Text>
                </View>
                <View style={{ flex: 1, width: "100%" }}>
                  <Text style={styles.bioTitle}>Habitat:</Text>
                  <Text style={styles.bio}>
                    {pokemonSpecies.habitat.name.charAt(0).toUpperCase() +
                      pokemonSpecies.habitat.name.slice(1)}
                  </Text>
                  <Text
                    style={[
                      styles.bioTitle,
                      {
                        marginTop: 25,
                      },
                    ]}
                  >
                    Weight:
                  </Text>
                  <Text style={styles.bio}>{pokemon.weight} hg</Text>
                  <Pressable onPress={evolve}>
                    <View style={styles.evolveBg}>
                      <Text style={styles.evolveText}>Evolve Me !</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1.5, width: "100%" }}>
            <View style={styles.statBg}>
              {pokemon.stats.map((el, idx) => {
                return (
                  <View style={{ flex: 1 }} key={idx}>
                    <Text style={styles.textBar}>
                      {el.stat.name.split("-").join(" ")}
                    </Text>
                    <View style={styles.statBarBg}>
                      <View
                        style={[
                          styles.statBar,
                          {
                            width: `${
                              el.base_stat >= 100 ? "100%" : `${el.base_stat}%`
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.statNumber}>{el.base_stat}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBar: {
    textAlign: "left",
    color: "black",
    fontWeight: "500",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 24,
    marginVertical: 20,
    marginLeft: 20,
  },
  statNumber: {
    color: "white",
    fontWeight: "400",
    fontSize: 15,
    marginLeft: 10,
  },
  statBar: {
    flex: 1,
    backgroundColor: "#991b1b",
    borderRadius: 15,
    justifyContent: "center",
  },
  statBarBg: {
    flex: 1,
    backgroundColor: "#d1d5db",
    borderRadius: 15,
    width: `100%`,
  },
  statBg: {
    flex: 6,
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  evolveText: {
    textAlign: "center",
    color: "white",
    fontWeight: "400",
    fontSize: 15,
    padding: 7,
  },
  evolveBg: {
    backgroundColor: "#84cc16",
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  bio: {
    color: "black",
    fontWeight: "400",
    fontSize: 15,
    marginLeft: 10,
  },
  bioTitle: {
    color: "black",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
  },
  biodata: {
    color: "black",
    fontWeight: "500",
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 10,
  },
});
