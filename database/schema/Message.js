module.exports.createMessageSchema = function (gql) {
  return MessageSchema = gql`
    type Message {
      objectId: String!
      chatId: String!
      userId: String!
      userFullname: String!
      userInitials: String!
      userPictureAt: Int!
      type: String!
      text: String!
      photoWidth: Int!
      photoHeight: Int!
      videoDuration: Int!
      audioDuration: Int!
      latitude: Float!
      longitude: Float!
      isMediaQueued: Boolean!
      isMediaFailed: Boolean!
      isDeleted: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      message(chatIds: [String]!, updatedAt: Int!): Message!
    }

    extend type Query {
      messages(chatIds: [String]!, updatedAt: Int!): [Message]
    }

    extend type Mutation {
      insertMessage(objectId: String!, chatId: String!, userId: String!, userFullname: String!, userInitials: String!, userPictureAt: Int!, type: String!, text: String!, photoWidth: Int!, photoHeight: Int!, videoDuration: Int!, audioDuration: Int!, latitude: Float!, longitude: Float!, isMediaQueued: Boolean!, isMediaFailed: Boolean!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Message!
      updateMessage(objectId: String!, chatId: String!, userId: String!, userFullname: String!, userInitials: String!, userPictureAt: Int!, type: String!, text: String!, photoWidth: Int!, photoHeight: Int!, videoDuration: Int!, audioDuration: Int!, latitude: Float!, longitude: Float!, isMediaQueued: Boolean!, isMediaFailed: Boolean!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Message!
    }
  `
}

const MESSAGE_CHANGE = 'MESSAGE_CHANGE';

module.exports.createMessageResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      message: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(MESSAGE_CHANGE),
          (payload, args) => (args.chatIds.indexOf(payload.chatId) > -1) && (payload.updatedAt > args.updatedAt)
        )
      }
    },
    Query: {
      messages: async(root, args) => {
        const filter = { 
          chatId: { 
            [Operation.in]: args.chatIds
          },
          updatedAt: {
            [Operation.gt]: args.updatedAt
          }
        }
        return await database.models.Message.findAll({ where: filter});
      }
    },
    Mutation: {
      insertMessage: async(root, args, context, info) => {
        let message = await database.models.Message.create(args);
        pubsub.publish(MESSAGE_CHANGE, { 
          chatId: args.chatId,
          updatedAt: args.updatedAt,
          message: message.dataValues 
        });
        return message;
      },
      updateMessage: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { chatId: args.chatId }, 
              { objectId: args.objectId } 
            ]
          }
        }
        await database.models.Message.update(args, filter)
          .then(() => {
            pubsub.publish(MESSAGE_CHANGE, {
              chatId: args.chatId,
              updatedAt: args.updatedAt,
              message: args
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