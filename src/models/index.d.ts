import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ItemRatingOptions {
  TERRIBLE = "TERRIBLE",
  BAD = "BAD",
  OK = "OK",
  GOOD = "GOOD",
  AMAZING = "AMAZING"
}

export enum ItemTypes {
  FOOD = "FOOD",
  DRINK = "DRINK"
}

export enum RestaurantStatus {
  TRY = "TRY",
  TRIED = "TRIED"
}

export enum GenderOptions {
  MALE = "MALE",
  FEMALE = "FEMALE"
}



type ItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Item {
  readonly id: string;
  readonly name: string;
  readonly type: ItemTypes | keyof typeof ItemTypes;
  readonly rating: ItemRatingOptions | keyof typeof ItemRatingOptions;
  readonly Restaurant?: Restaurant | null;
  readonly Users?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly itemRestaurantId?: string | null;
  constructor(init: ModelInit<Item, ItemMetaData>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item, ItemMetaData>) => MutableModel<Item, ItemMetaData> | void): Item;
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly cuisine: string;
  readonly address: string;
  readonly image?: string | null;
  readonly cost: string;
  readonly rating: number;
  readonly status?: RestaurantStatus | keyof typeof RestaurantStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly gender: GenderOptions | keyof typeof GenderOptions;
  readonly birthday: string;
  readonly favoriteCuisine: string;
  readonly itemID: string;
  readonly RestaurantsID?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}