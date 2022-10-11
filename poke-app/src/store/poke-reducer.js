import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

let initState = {
  pokemons: [],
  pokemon: {},
  pokemonSpecies: {},
};

function pokeReducer(state = initState, action) {
  switch (action.type) {
    case "pokemons/fetchSuccess":
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload.results],
        next: action.payload.next,
      };
    case "pokemon/fetchSuccess":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "pokemonSpecies/fetchSuccess":
      return {
        ...state,
        pokemonSpecies: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(pokeReducer, applyMiddleware(thunk));

export default store;
