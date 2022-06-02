// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ItemType = {
  "FOOD": "FOOD",
  "DRINK": "DRINK"
};

const RestaurantStatus = {
  "TRY": "TRY",
  "TRIED": "TRIED"
};

const { User, Coordinates, Item, Restaurant } = initSchema(schema);

export {
  User,
  ItemType,
  RestaurantStatus,
  Coordinates,
  Item,
  Restaurant
};