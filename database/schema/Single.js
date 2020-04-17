module.exports.createSingleSchema = function (gql) {
  return SingleSchema = gql`
    type Single {
      objectId: String!
      chatId: String!
      userId1: String!
      fullname1: String!
      initials1: String!
      pictureAt1: Int!
      userId2: String!
      fullname2: String!
      initials2: String!
      pictureAt2: Int!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      single(userId1: String, userId2: String): Single!
    }

    extend type Query {
      singles(userId1: String, userId2: String): [Single]
    }

    extend type Mutation {
      insertSingle(objectId: String!, chatId: String!, userId1: String!, fullname1: String!, initials1: String!, pictureAt1: Int!, userId2: String!, fullname2: String!, initials2: String!, pictureAt2: Int!, createdAt: Int!, updatedAt: Int!): Single!
      updateSingle(objectId: String!, chatId: String!, userId1: String!, fullname1: String!, initials1: String!, pictureAt1: Int!, userId2: String!, fullname2: String!, initials2: String!, pictureAt2: Int!, createdAt: Int!, updatedAt: Int!): Single!
    }
  `
}

const SINGLE_CHANGE = 'SINGLE_CHANGE';

module.exports.createSingleResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      single: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(SINGLE1_CHANGE),
          (payload, args) => { 
            if (args.userId1) {
              return args.userId1 === payload.userId1
            } else if (args.userId2) {
              return args.userId2 === payload.userId2
            }
          }
        )
      }
    },
    Query: {
      singles: async(root, args) => {
        let filter  = { }
        if (args.userId1) {
          filter = { 
            userId1: { 
              [Operation.eq]: args.userId1
            }
          }
        } else if (args.userId2) {
          filter = { 
            userId2: { 
              [Operation.eq]: args.userId2
            }
          }
        }
        return await database.models.Single.findAll({ where: filter });
      }
    },
    Mutation: {
      insertSingle: async(root, args, context, info) => {
        let single = await database.models.Single.create(args);
        pubsub.publish(SINGLE_CHANGE, {
          userId1: args.userId1,
          userId2: args.userId2,
          single: single.dataValues 
        });
        return single;
      },
      updateSingle: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { userId1: args.userId1 }, 
              { userId2: args.userId2 } 
            ]
          }
        }
        await database.models.Single.update(args, filter)
          .then(() => {
            pubsub.publish(SINGLE_CHANGE, {
              userId1: args.userId1,
              userId2: args.userId2,
              single: args
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