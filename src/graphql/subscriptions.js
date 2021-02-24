/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSystem = /* GraphQL */ `
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
export const onUpdateSystem = /* GraphQL */ `
  subscription OnUpdateSystem {
    onUpdateSystem {
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
export const onDeleteSystem = /* GraphQL */ `
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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset {
    onUpdateAsset {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset {
    onDeleteAsset {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
export const onCreateNote = /* GraphQL */ `
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
export const onUpdateNote = /* GraphQL */ `
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
export const onDeleteNote = /* GraphQL */ `
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
export const onCreateTap = /* GraphQL */ `
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
export const onUpdateTap = /* GraphQL */ `
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
export const onDeleteTap = /* GraphQL */ `
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
export const onCreateUser = /* GraphQL */ `
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
export const onUpdateUser = /* GraphQL */ `
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
export const onDeleteUser = /* GraphQL */ `
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
