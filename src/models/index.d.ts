import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ItemType {
  FOOD = "FOOD",
  DRINK = "DRINK"
}

export enum RestaurantStatus {
  TRY = "TRY",
  TRIED = "TRIED"
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
  readonly nam: string;
  readonly rating: string;
  readonly type: ItemType | keyof typeof ItemType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Item, ItemMetaData>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item, ItemMetaData>) => MutableModel<Item, ItemMetaData> | void): Item;
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly cuisine: string;
  readonly status: RestaurantStatus | keyof typeof RestaurantStatus;
  readonly image?: string | null;
  readonly cost: string;
  readonly rating: number;
  readonly itemsID?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly gender: string;
  readonly birthday: string;
  readonly restaurantsID?: (string | null)[] | null;
  readonly sub: string;
  readonly favoriteCuisine: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}