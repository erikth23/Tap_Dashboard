/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSystem =/* GraphQL */
`
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
export const listSystems =/* GraphQL */
`
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
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAsset =/* GraphQL */
`
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
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
export const listAssets =/* GraphQL */
`
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
      nextToken
    }
  }
`;
export const getTask =/* GraphQL */
`
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
          updatedAt
        }
        nextToken
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
        createdAt
        updatedAt
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTasks =/* GraphQL */
`
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
          items {
            comment
            createdAt
            user {
              userName
            }
          }
          nextToken
        }
        systemID
        system {
          id
          name
          createdAt
          updatedAt
        }
        assetID
        asset {
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
        status
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote =/* GraphQL */
`
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listNotes =/* GraphQL */
`
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTap =/* GraphQL */
`
  query GetTap($id: ID!) {
    getTap(id: $id) {
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
export const listTaps =/* GraphQL */
`
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
      nextToken
    }
  }
`;
export const getUser =/* GraphQL */
`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers =/* GraphQL */
`
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
