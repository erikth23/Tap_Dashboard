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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset {
    onUpdateAsset {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset {
    onDeleteAsset {
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
export const onCreateGuest = /* GraphQL */ `
  subscription OnCreateGuest {
    onCreateGuest {
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
export const onUpdateGuest = /* GraphQL */ `
  subscription OnUpdateGuest {
    onUpdateGuest {
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
export const onDeleteGuest = /* GraphQL */ `
  subscription OnDeleteGuest {
    onDeleteGuest {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
