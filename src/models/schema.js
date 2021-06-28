export const schema = {
    "models": {
        "System": {
            "name": "System",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "assets": {
                    "name": "assets",
                    "isArray": true,
                    "type": {
                        "model": "Asset"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "systemID"
                    }
                },
                "tasks": {
                    "name": "tasks",
                    "isArray": true,
                    "type": {
                        "model": "Task"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "systemID"
                    }
                },
                "users": {
                    "name": "users",
                    "isArray": true,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "systemID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Systems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Asset": {
            "name": "Asset",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "systemID": {
                    "name": "systemID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "tagID": {
                    "name": "tagID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "assetType": {
                    "name": "assetType",
                    "isArray": false,
                    "type": {
                        "enum": "AssetType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "AssetStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "roomType": {
                    "name": "roomType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "accountStatus": {
                    "name": "accountStatus",
                    "isArray": false,
                    "type": {
                        "enum": "AttendantAccountStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "occupiedStatus": {
                    "name": "occupiedStatus",
                    "isArray": false,
                    "type": {
                        "enum": "AttendantOccupiedStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "assignTo": {
                    "name": "assignTo",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "wifi": {
                    "name": "wifi",
                    "isArray": false,
                    "type": {
                        "nonModel": "RoomWifi"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Assets",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySystem",
                        "fields": [
                            "systemID",
                            "tagID"
                        ]
                    }
                }
            ]
        },
        "Task": {
            "name": "Task",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "shortDescription": {
                    "name": "shortDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "isArray": true,
                    "type": {
                        "model": "Note"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "taskOrAssetID"
                    }
                },
                "systemID": {
                    "name": "systemID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "assetID": {
                    "name": "assetID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "asset": {
                    "name": "asset",
                    "isArray": false,
                    "type": {
                        "model": "Asset"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "TaskStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "locale": {
                    "name": "locale",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Tasks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySystem",
                        "fields": [
                            "systemID",
                            "assetID"
                        ]
                    }
                }
            ]
        },
        "Note": {
            "name": "Note",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "taskOrAssetID": {
                    "name": "taskOrAssetID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "comment": {
                    "name": "comment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "locale": {
                    "name": "locale",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Notes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTask",
                        "fields": [
                            "taskOrAssetID"
                        ]
                    }
                }
            ]
        },
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "userName": {
                    "name": "userName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "systemID": {
                    "name": "systemID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySystem",
                        "fields": [
                            "systemID",
                            "userName"
                        ]
                    }
                }
            ]
        },
        "Guest": {
            "name": "Guest",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "number": {
                    "name": "number",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "assetID": {
                    "name": "assetID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "systemID": {
                    "name": "systemID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "GuestStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Guests",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySystem",
                        "fields": [
                            "systemID",
                            "assetID"
                        ]
                    }
                }
            ]
        },
        "Tap": {
            "name": "Tap",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "assetID": {
                    "name": "assetID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "asset": {
                    "name": "asset",
                    "isArray": false,
                    "type": {
                        "model": "Asset"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "purpose": {
                    "name": "purpose",
                    "isArray": false,
                    "type": {
                        "enum": "TapType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "tapDate": {
                    "name": "tapDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "accountStatus": {
                    "name": "accountStatus",
                    "isArray": false,
                    "type": {
                        "enum": "AttendantAccountStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "occupiedStatus": {
                    "name": "occupiedStatus",
                    "isArray": false,
                    "type": {
                        "enum": "AttendantOccupiedStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "assignTo": {
                    "name": "assignTo",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Taps",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byAsset",
                        "fields": [
                            "assetID",
                            "purpose"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "AssetType": {
            "name": "AssetType",
            "values": [
                "ROOM",
                "EQUIPMENT",
                "INVENTORY"
            ]
        },
        "AssetStatus": {
            "name": "AssetStatus",
            "values": [
                "CLEAN",
                "READY",
                "OCCUPIED",
                "DIRTY",
                "BROKEN"
            ]
        },
        "TaskStatus": {
            "name": "TaskStatus",
            "values": [
                "INPROGRESS",
                "NOTTAKEN",
                "COMPLETED",
                "ARCHIVED",
                "STUCK"
            ]
        },
        "TapType": {
            "name": "TapType",
            "values": [
                "START_CLEANING",
                "END_CLEANING",
                "DO_NOT_DISTURB",
                "COMPLETETASK",
                "HOUSEKEEPING",
                "LOGGING",
                "MAINTENANCE",
                "OTHER"
            ]
        },
        "AttendantAccountStatus": {
            "name": "AttendantAccountStatus",
            "values": [
                "STAY",
                "CO",
                "OOI",
                "OOO",
                "NEW"
            ]
        },
        "AttendantOccupiedStatus": {
            "name": "AttendantOccupiedStatus",
            "values": [
                "OCC",
                "VAC",
                "OOI",
                "OOO"
            ]
        },
        "GuestStatus": {
            "name": "GuestStatus",
            "values": [
                "WAIT",
                "IN",
                "DONE"
            ]
        }
    },
    "nonModels": {
        "RoomWifi": {
            "name": "RoomWifi",
            "fields": {
                "userName": {
                    "name": "userName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "password": {
                    "name": "password",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "version": "fa3108326a63f1d802f9ad5b0c4a4b7c"
};