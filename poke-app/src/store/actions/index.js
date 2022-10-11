import axios from "axios";

const pokemonsFetchSuccess = (payload) => {
  return { type: "pokemons/fetchSuccess", payload };
};

const pokemonFetchSuccess = (payload) => {
  return { type: "pokemon/fetchSuccess", payload };
};

const pokemonSpeciesFetchSuccess = (payload) => {
  return { type: "pokemonSpecies/fetchSuccess", payload };
};

export const fetchPokemons = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      dispatch(pokemonsFetchSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPokemon = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      dispatch(pokemonFetchSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPokemonSpecies = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      dispatch(pokemonSpeciesFetchSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
