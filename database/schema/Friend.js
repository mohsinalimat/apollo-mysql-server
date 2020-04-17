module.exports.createFriendSchema = function (gql) {
  return FriendSchema = gql`
    scalar GraphQLLong

    type Friend {
      objectId: String!
      userId: String!
      friendId: String!
      isDeleted: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    type Subscription {
      friend(userId: String!): Friend!
    }

    type Query {
      friends(userId: String!): [Friend]
    }

    type Mutation {
      insertFriend(objectId: String!, userId: String!, friendId: String! isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Friend!
      updateFriend(objectId: String!, userId: String!, friendId: String! isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Friend!
    }
`
}

const FRIEND_CHANGE = 'FRIEND_CHANGE'; 

module.exports.createFriendResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      friend: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(FRIEND_CHANGE),
          (payload, args) => { 
            return args.userId === payload.userId }
        )
      }
    },
    Query: {
      friends: async(root, args) => {
        let filter = { 
          userId: { 
            [Operation.eq]: args.userId
          }
        }
        return await database.models.Friend.findAll({ where: filter });
      }
    },
    Mutation: {
      insertFriend: async(root, args, context, info) => {
        let friend = await database.models.Friend.create(args);
        pubsub.publish(FRIEND_CHANGE, {
          userId: args.userId,
          friend: friend.dataValues 
        });
        return friend;
      },
      updateFriend: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { friendId: args.friendId }, 
              { userId: args.userId } 
            ]
          }
        }
        await database.models.Friend.update(args, filter)
          .then(() => {
            pubsub.publish(FRIEND_CHANGE, {
              userId: args.userId,
              friend: args
            });
          })
          .catch((error) => {
            console.log('error', error)
          });
        return args;
      }
    }
  }
}