/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSystem = /* GraphQL */ `
  mutation CreateSystem(
    $input: CreateSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    createSystem(input: $input, condition: $condition) {
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
export const updateSystem = /* GraphQL */ `
  mutation UpdateSystem(
    $input: UpdateSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    updateSystem(input: $input, condition: $condition) {
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
export const deleteSystem = /* GraphQL */ `
  mutation DeleteSystem(
    $input: DeleteSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    deleteSystem(input: $input, condition: $condition) {
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
export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
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
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
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
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
export const createGuest = /* GraphQL */ `
  mutation CreateGuest(
    $input: CreateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    createGuest(input: $input, condition: $condition) {
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
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
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
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createTap = /* GraphQL */ `
  mutation CreateTap(
    $input: CreateTapInput!
    $condition: ModelTapConditionInput
  ) {
    createTap(input: $input, condition: $condition) {
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
export const updateTap = /* GraphQL */ `
  mutation UpdateTap(
    $input: UpdateTapInput!
    $condition: ModelTapConditionInput
  ) {
    updateTap(input: $input, condition: $condition) {
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
export const deleteTap = /* GraphQL */ `
  mutation DeleteTap(
    $input: DeleteTapInput!
    $condition: ModelTapConditionInput
  ) {
    deleteTap(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
