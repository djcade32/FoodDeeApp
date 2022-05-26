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

const { Item, Restaurant, User } = initSchema(schema);

export {
  Item,
  Restaurant,
  User,
  ItemType,
  RestaurantStatus
};