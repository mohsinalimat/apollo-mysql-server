module.exports.createDetailSchema = function (gql) {
  return DetailSchema = gql`
    type Detail {
      objectId: String!
      chatId:  String!
      userId:  String!
      typing: Boolean!
      lastRead: Int!
      mutedUntil: Int!
      isDeleted: Boolean!
      isArchived: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      detail(chatIds: [String]!): Detail!
    }

    extend type Query {
      details(chatIds: [String]!): [Detail]
    }

    extend type Mutation {
      insertDetail(objectId: String!, chatId:  String!, userId: String!, typing: Boolean!, lastRead: Int!, mutedUntil: Int!, isDeleted: Boolean!, isArchived: Boolean!, createdAt: Int!, updatedAt: Int!): Detail!
      updateDetail(objectId: String!, chatId:  String!, userId: String!, typing: Boolean!, lastRead: Int!, mutedUntil: Int!, isDeleted: Boolean!, isArchived: Boolean!, createdAt: Int!, updatedAt: Int!): Detail!
    }
  `
}

const DETAIL_CHANGE = 'DETAIL_CHANGE';

module.exports.createDetailResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      detail: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(DETAIL_CHANGE),
          (payload, args) => args.chatIds.indexOf(payload.chatId) > -1
        )
      }
    },
    Query: {
      details: async(root, args) => {
        let filter = { 
          chatId: { 
            [Operation.in]: args.chatIds
          }
        }
        let details = await database.models.Detail.findAll({ where: filter });
        return details
      }
    },
    Mutation: {
      insertDetail: async(root, args, context, info) => {
        let detail = await database.models.Detail.create(args);
        pubsub.publish(DETAIL_CHANGE, { 
          chatId: args.chatId,
          detail: detail.dataValues 
        });
        return detail;
      },
      updateDetail: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { chatId: args.chatId }, 
              { userId: args.userId } 
            ]
          }
        }
        await database.models.Detail.update(args, filter)
          .then(() => {
            pubsub.publish(DETAIL_CHANGE, {
              chatId: args.chatId,
              detail: args
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