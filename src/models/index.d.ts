import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ItemType {
  FOOD = "FOOD",
  DRINK = "DRINK"
}

export enum RestaurantStatus {
  TRY = "TRY",
  TRIED = "TRIED"
}

export declare class Item {
  readonly id?: string | null;
  readonly name?: string | null;
  readonly rating: string;
  readonly type: ItemType | keyof typeof ItemType;
  constructor(init: ModelInit<Item>);
}

export declare class Restaurant {
  readonly id?: string | null;
  readonly name: string;
  readonly address: string;
  readonly cuisine: string;
  readonly status: RestaurantStatus | keyof typeof RestaurantStatus;
  readonly image?: string | null;
  readonly cost?: string | null;
  readonly rating: number;
  readonly itemsID?: (Item | null)[] | null;
  constructor(init: ModelInit<Restaurant>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly gender: string;
  readonly birthday: string;
  readonly sub: string;
  readonly favoriteCuisine: string;
  readonly restaurants?: (Restaurant | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}