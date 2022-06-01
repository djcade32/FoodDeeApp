// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ItemRatingOptions = {
  "TERRIBLE": "TERRIBLE",
  "BAD": "BAD",
  "OK": "OK",
  "GOOD": "GOOD",
  "AMAZING": "AMAZING"
};

const ItemTypes = {
  "FOOD": "FOOD",
  "DRINK": "DRINK"
};

const RestaurantStatus = {
  "TRY": "TRY",
  "TRIED": "TRIED"
};

const GenderOptions = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { Item, Restaurant, User } = initSchema(schema);

export {
  Item,
  Restaurant,
  User,
  ItemRatingOptions,
  ItemTypes,
  RestaurantStatus,
  GenderOptions
};