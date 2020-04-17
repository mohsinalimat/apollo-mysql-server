module.exports.createGroupSchema = function (gql) {
  return GroupSchema = gql`
    type Group {
      objectId: String!
      chatId:  String!
      name:  String!
      ownerId:  String!
      isDeleted: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      group(chatIds: [String]!): Group!
    }

    extend type Query {
      groups(chatIds: [String]!): [Group]
    }

    extend type Mutation {
      insertGroup(objectId: String!, chatId:  String!, name:  String!, ownerId:  String!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Group!
      updateGroup(objectId: String!, chatId:  String!, name:  String!, ownerId:  String!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Group!
    }
  `
}

const GROUP_CHANGE = 'GROUP_CHANGE';

module.exports.createGroupResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      group: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(GROUP_CHANGE),
          (payload, args) => args.chatIds.indexOf(payload.chatId) > -1
        )
      }
    },
    Query: {
      groups: async(root, args) => {
        let filter = { 
          chatId: { 
            [Operation.in]: args.chatIds
          }
        }
        console.log(database.models)
        return await database.models.Groups_.findAll({ where: filter });
      }
    },
    Mutation: {
      insertGroup: async(root, args, context, info) => {
        let group = await database.models.Groups_.create(args);
        pubsub.publish(GROUP_CHANGE, { 
          chatId: args.chatId,
          group: group.dataValues
        });
        return group;
      },
      updateGroup: async(root, args, context, info) => {
        const filter = { where: { chatId: args.chatId } }
        await database.models.Groups_.update(args, filter)
          .then(() => {
            pubsub.publish(GROUP_CHANGE, {
              chatId: args.chatId,
              group: args
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