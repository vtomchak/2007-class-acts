import  { combineReducers } from 'redux';
import artworksReducer from './artworks';
import artworkReducer from './artwork';
import artistsReducer from './artists';
import genresReducer from './genres';
import usersReducer from './users'
import userReducer from './user'
import cartReducer from './cart';

const reducer = combineReducers({
  artworks: artworksReducer,
  artwork: artworkReducer,
  artists: artistsReducer,
  genres: genresReducer,
  users: usersReducer,
  user: userReducer,
  cart: cartReducer
});

export default reducer;
