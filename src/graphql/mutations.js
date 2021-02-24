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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userName
          firstName
          lastName
          systemID
          createdAt
          updatedAt
        }
        nextToken
      }
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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userName
          firstName
          lastName
          systemID
          createdAt
          updatedAt
        }
        nextToken
      }
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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userName
          firstName
          lastName
          systemID
          createdAt
          updatedAt
        }
        nextToken
      }
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
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      tagID
      assetType
      status
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
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      tagID
      assetType
      status
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
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      tagID
      assetType
      status
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
          updatedAt
        }
        nextToken
      }
      systemID
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      assetID
      asset {
        id
        name
        description
        systemID
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      status
      createdAt
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
          updatedAt
        }
        nextToken
      }
      systemID
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      assetID
      asset {
        id
        name
        description
        systemID
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      status
      createdAt
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
          updatedAt
        }
        nextToken
      }
      systemID
      system {
        id
        name
        assets {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      assetID
      asset {
        id
        name
        description
        systemID
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      status
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
        createdAt
        updatedAt
      }
      createdAt
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
        createdAt
        updatedAt
      }
      createdAt
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
        createdAt
        updatedAt
      }
      createdAt
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
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      purpose
      timestamp
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        createdAt
        updatedAt
      }
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
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      purpose
      timestamp
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        createdAt
        updatedAt
      }
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
        system {
          id
          name
          createdAt
          updatedAt
        }
        tagID
        assetType
        status
        createdAt
        updatedAt
      }
      purpose
      timestamp
      userID
      user {
        id
        userName
        firstName
        lastName
        systemID
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
    }
  }
`;
