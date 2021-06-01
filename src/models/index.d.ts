import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum AssetType {
  ROOM = "ROOM",
  EQUIPMENT = "EQUIPMENT",
  INVENTORY = "INVENTORY"
}

export enum AssetStatus {
  CLEAN = "CLEAN",
  READY = "READY",
  OCCUPIED = "OCCUPIED",
  DIRTY = "DIRTY",
  BROKEN = "BROKEN"
}

export enum TaskStatus {
  INPROGRESS = "INPROGRESS",
  NOTTAKEN = "NOTTAKEN",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
  STUCK = "STUCK"
}

export enum TapType {
  START_CLEANING = "START_CLEANING",
  END_CLEANING = "END_CLEANING",
  DO_NOT_DISTURB = "DO_NOT_DISTURB",
  COMPLETETASK = "COMPLETETASK",
  HOUSEKEEPING = "HOUSEKEEPING",
  LOGGING = "LOGGING",
  MAINTENANCE = "MAINTENANCE",
  OTHER = "OTHER"
}

export enum AttendantAccountStatus {
  STAY = "STAY",
  CO = "CO",
  OOI = "OOI",
  OOO = "OOO",
  NEW = "NEW"
}

export enum AttendantOccupiedStatus {
  OCC = "OCC",
  VAC = "VAC",
  OOI = "OOI",
  OOO = "OOO"
}

export enum GuestStatus {
  WAIT = "WAIT",
  IN = "IN",
  DONE = "DONE"
}



export declare class System {
  readonly id: string;
  readonly name: string;
  readonly assets?: (Asset | null)[];
  readonly tasks?: (Task | null)[];
  readonly users?: (User | null)[];
  constructor(init: ModelInit<System>);
  static copyOf(source: System, mutator: (draft: MutableModel<System>) => MutableModel<System> | void): System;
}

export declare class Asset {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly systemID: string;
  readonly tagID: string;
  readonly assetType: AssetType | keyof typeof AssetType;
  readonly status: AssetStatus | keyof typeof AssetStatus;
  readonly roomType?: string;
  readonly accountStatus?: AttendantAccountStatus | keyof typeof AttendantAccountStatus;
  readonly occupiedStatus?: AttendantOccupiedStatus | keyof typeof AttendantOccupiedStatus;
  readonly assignTo?: string;
  constructor(init: ModelInit<Asset>);
  static copyOf(source: Asset, mutator: (draft: MutableModel<Asset>) => MutableModel<Asset> | void): Asset;
}

export declare class Task {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly comments?: (Note | null)[];
  readonly systemID: string;
  readonly assetID: string;
  readonly asset?: Asset;
  readonly userID: string;
  readonly user?: User;
  readonly status?: TaskStatus | keyof typeof TaskStatus;
  readonly createdAt: string;
  readonly locale: string;
  constructor(init: ModelInit<Task>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

export declare class Note {
  readonly id: string;
  readonly taskOrAssetID: string;
  readonly comment: string;
  readonly image?: string;
  readonly userID: string;
  readonly user?: User;
  readonly createdAt: string;
  readonly locale: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

export declare class User {
  readonly id: string;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly systemID: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Guest {
  readonly id: string;
  readonly number: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly assetID: string;
  readonly systemID: string;
  readonly status: GuestStatus | keyof typeof GuestStatus;
  constructor(init: ModelInit<Guest>);
  static copyOf(source: Guest, mutator: (draft: MutableModel<Guest>) => MutableModel<Guest> | void): Guest;
}

export declare class Tap {
  readonly id: string;
  readonly assetID: string;
  readonly asset?: Asset;
  readonly purpose: TapType | keyof typeof TapType;
  readonly userID: string;
  readonly user?: User;
  readonly tapDate?: string;
  readonly accountStatus?: AttendantAccountStatus | keyof typeof AttendantAccountStatus;
  readonly occupiedStatus?: AttendantOccupiedStatus | keyof typeof AttendantOccupiedStatus;
  readonly assignTo?: string;
  constructor(init: ModelInit<Tap>);
  static copyOf(source: Tap, mutator: (draft: MutableModel<Tap>) => MutableModel<Tap> | void): Tap;
}