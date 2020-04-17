module.exports.createBlockedSchema = function (gql) {
  return BlockedSchema = gql`
    type Blocked {
      objectId: String!
      blockerId: String!
      blockedId: String!
      isDeleted: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      blocked(blockedId: String, blockerId: String): Blocked!
    }

    extend type Query {
      blockeds(blockedId: String, blockerId: String): [Blocked]
    }

    extend type Mutation {
      insertBlocked(objectId: String!, blockerId: String!, blockedId: String!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Blocked!
      updateBlocked(objectId: String!, blockerId: String!, blockedId: String!, isDeleted: Boolean!, createdAt: Int!, updatedAt: Int!): Blocked!
    }
  `
}

const BLOCKED_CHANGE = 'BLOCKED_CHANGE';

module.exports.createBlockedResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      blocked: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(BLOCKED_CHANGE),
          (payload, args) => { 
            if (args.blockedId) {
              return args.blockedId === payload.blockedId
            } else if (args.blockerId) {
              return args.blockerId === payload.blockerId
            }
          }
        )
      }
    },
    Query: {
      blockeds: async(root, args) => {
        let filter  = { }
        if (args.blockedId) {
          filter = { 
            blockedId: { 
              [Operation.eq]: args.blockedId
            }
          }
        } else if (args.blockerId) {
          filter = { 
            blockerId: { 
              [Operation.eq]: args.blockerId
            }
          }
        }
        return await database.models.Blocked.findAll({ where: filter });
      }
    },
    Mutation: {
      insertBlocked: async(root, args, context, info) => {
        let blocked = await database.models.Blocked.create(args);
        pubsub.publish(BLOCKED_CHANGE, { 
          blockedId: args.blockedId,
          blockerId: args.blockerId,
          blocked: blocked.dataValues 
        });
        return blocked;
      },
      updateBlocked: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { blockedId: args.blockedId }, 
              { blockerId: args.blockerId } 
            ]
          }
        }
        await database.models.Blocked.update(args, filter)
          .then(() => {
            pubsub.publish(BLOCKED_CHANGE, {
              blockedId: args.blockedId,
              blockerId: args.blockerId,
              blocked: args
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