// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AssetType = {
  "ROOM": "ROOM",
  "EQUIPMENT": "EQUIPMENT",
  "INVENTORY": "INVENTORY"
};

const AssetStatus = {
  "CLEAN": "CLEAN",
  "READY": "READY",
  "OCCUPIED": "OCCUPIED",
  "DIRTY": "DIRTY",
  "BROKEN": "BROKEN"
};

const TaskStatus = {
  "INPROGRESS": "INPROGRESS",
  "NOTTAKEN": "NOTTAKEN",
  "COMPLETED": "COMPLETED",
  "ARCHIVED": "ARCHIVED",
  "STUCK": "STUCK"
};

const TapType = {
  "START_CLEANING": "START_CLEANING",
  "END_CLEANING": "END_CLEANING",
  "DO_NOT_DISTURB": "DO_NOT_DISTURB",
  "COMPLETETASK": "COMPLETETASK",
  "HOUSEKEEPING": "HOUSEKEEPING",
  "LOGGING": "LOGGING",
  "MAINTENANCE": "MAINTENANCE",
  "OTHER": "OTHER"
};

const AttendantAccountStatus = {
  "STAY": "STAY",
  "CO": "CO",
  "OOI": "OOI",
  "OOO": "OOO",
  "NEW": "NEW"
};

const AttendantOccupiedStatus = {
  "OCC": "OCC",
  "VAC": "VAC",
  "OOI": "OOI",
  "OOO": "OOO"
};

const { System, Asset, Task, Note, User, Tap } = initSchema(schema);

export {
  System,
  Asset,
  Task,
  Note,
  User,
  Tap,
  AssetType,
  AssetStatus,
  TaskStatus,
  TapType,
  AttendantAccountStatus,
  AttendantOccupiedStatus
};