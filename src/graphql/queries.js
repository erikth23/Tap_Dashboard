/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncSystems = /* GraphQL */ `
  query SyncSystems(
    $filter: ModelSystemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSystems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        assets {
          nextToken
          startedAt
        }
        tasks {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSystem = /* GraphQL */ `
  query GetSystem($id: ID!) {
    getSystem(id: $id) {
      id
      name
      assets {
        items {
          id
          name
          description
          systemID
          tagID
          assetType
          status
          roomType
          accountStatus
          occupiedStatus
          assignTo
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      tasks {
        items {
          id
          title
          shortDescription
          systemID
          assetID
          userID
          status
          createdAt
          locale
          _version
          _deleted
          _lastChangedAt
          updatedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listSystems = /* GraphQL */ `
  query ListSystems(
    $filter: ModelSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        assets {
          nextToken
          startedAt
        }
        tasks {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssets = /* GraphQL */ `
  query SyncAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        systemID
        tagID
        assetType
        status
        roomType
        accountStatus
        occupiedStatus
        assignTo
        wifi {
          userName
          password
          notes
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
      id
      name
      description
      systemID
      tagID
      assetType
      status
      roomType
      accountStatus
      occupiedStatus
      assignTo
      wifi {
        userName
        password
        notes
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAssets = /* GraphQL */ `
  query ListAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        systemID
        tagID
        assetType
        status
        roomType
        accountStatus
        occupiedStatus
        assignTo
        wifi {
          userName
          password
          notes
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        shortDescription
        comments {
          nextToken
          startedAt
        }
        systemID
        assetID
        asset {
          id
          name
          description
          systemID
          tagID
          assetType
          status
          roomType
          accountStatus
          occupiedStatus
          assignTo
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        status
        createdAt
        locale
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      shortDescription
      comments {
        items {
          id
          taskOrAssetID
          comment
          image
          userID
          createdAt
          locale
          _version
          _deleted
          _lastChangedAt
          updatedAt
        }
        nextToken
        startedAt
      }
      systemID
      assetID
      asset {
        id
        name
        description
        systemID
        tagID
        assetType
        status
        roomType
        accountStatus
        occupiedStatus
        assignTo
        wifi {
          userName
          password
          notes
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      status
      createdAt
      locale
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        shortDescription
        comments {
          nextToken
          startedAt
        }
        systemID
        assetID
        asset {
          id
          name
          description
          systemID
          tagID
          assetType
          status
          roomType
          accountStatus
          occupiedStatus
          assignTo
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        status
        createdAt
        locale
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGuests = /* GraphQL */ `
  query SyncGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGuests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        number
        firstName
        lastName
        assetID
        systemID
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getGuest = /* GraphQL */ `
  query GetGuest($id: ID!) {
    getGuest(id: $id) {
      id
      number
      firstName
      lastName
      assetID
      systemID
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        number
        firstName
        lastName
        assetID
        systemID
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        taskOrAssetID
        comment
        image
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        createdAt
        locale
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      taskOrAssetID
      comment
      image
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      createdAt
      locale
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        taskOrAssetID
        comment
        image
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        createdAt
        locale
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTaps = /* GraphQL */ `
  query SyncTaps(
    $filter: ModelTapFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTaps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        assetID
        asset {
          id
          name
          description
          systemID
          tagID
          assetType
          status
          roomType
          accountStatus
          occupiedStatus
          assignTo
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        purpose
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        tapDate
        accountStatus
        occupiedStatus
        assignTo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTap = /* GraphQL */ `
  query GetTap($id: ID!) {
    getTap(id: $id) {
      id
      assetID
      asset {
        id
        name
        description
        systemID
        tagID
        assetType
        status
        roomType
        accountStatus
        occupiedStatus
        assignTo
        wifi {
          userName
          password
          notes
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      purpose
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      tapDate
      accountStatus
      occupiedStatus
      assignTo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listTaps = /* GraphQL */ `
  query ListTaps(
    $filter: ModelTapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        assetID
        asset {
          id
          name
          description
          systemID
          tagID
          assetType
          status
          roomType
          accountStatus
          occupiedStatus
          assignTo
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        purpose
        userID
        user {
          id
          userName
          firstName
          lastName
          systemID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        tapDate
        accountStatus
        occupiedStatus
        assignTo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userName
        firstName
        lastName
        systemID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userName
      firstName
      lastName
      systemID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        firstName
        lastName
        systemID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
