/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSystem =/* GraphQL */
`
  subscription OnCreateSystem {
    onCreateSystem {
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
export const onUpdateSystem =/* GraphQL */
`
  subscription OnUpdateSystem(
    $id: String
  ) {
    onUpdateSystem(id: $id) {
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
export const onDeleteSystem =/* GraphQL */
`
  subscription OnDeleteSystem {
    onDeleteSystem {
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
export const onCreateAsset =/* GraphQL */
`
  subscription OnCreateAsset(
    $systemID: String!
  ) {
    onCreateAsset(systemID: $systemID) {
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
export const onUpdateAsset =/* GraphQL */
`
  subscription OnUpdateAsset(
    $systemID: String
    $id: String
  ) {
    onUpdateAsset(systemID: $systemID, id: $id) {
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
export const onDeleteAsset =/* GraphQL */
`
  subscription OnDeleteAsset(
    $systemID: String
    $id: String
  ) {
    onDeleteAsset(systemID: $systemID, id: $id) {
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
export const onCreateTask =/* GraphQL */
`
  subscription OnCreateTask(
    $systemID: String!
  ) {
    onCreateTask(systemID: $systemID) {
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
export const onUpdateTask =/* GraphQL */
`
  subscription OnUpdateTask (
    $systemID: String
    $id: String
  ) {
    onUpdateTask(systemID: $systemID, id: $id) {
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
        }
        nextToken
      }
      systemID
      system {
        id
        name
        users {
          nextToken
        }
      }
      assetID
      asset {
        id
        name
        description
        status
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskSystem =/* GraphQL */
`
  subscription OnUpdateTask (
    $systemID: String
  ) {
    onUpdateTask(systemID: $systemID) {
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
export const onDeleteTask =/* GraphQL */
`
  subscription OnDeleteTask (
    $systemID: String
    $id: String
  ) {
    onDeleteTask(systemID: $systemID, id: $id) {
      id
    }
  }
`;
export const onCreateNote =/* GraphQL */
`
  subscription OnCreateNote {
    onCreateNote {
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
export const onUpdateNote =/* GraphQL */
`
  subscription OnUpdateNote {
    onUpdateNote {
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
export const onDeleteNote =/* GraphQL */
`
  subscription OnDeleteNote {
    onDeleteNote {
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
export const onCreateTap =/* GraphQL */
`
  subscription OnCreateTap {
    onCreateTap {
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
export const onUpdateTap =/* GraphQL */
`
  subscription OnUpdateTap {
    onUpdateTap {
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
export const onDeleteTap =/* GraphQL */
`
  subscription OnDeleteTap {
    onDeleteTap {
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
export const onCreateUser =/* GraphQL */
`
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser =/* GraphQL */
`
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser =/* GraphQL */
`
  subscription OnDeleteUser {
    onDeleteUser {
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
