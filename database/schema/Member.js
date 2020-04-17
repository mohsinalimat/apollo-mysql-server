module.exports.createMemberSchema = function (gql) {
  return MemberSchema = gql`
    type Member {
      objectId: String!
      chatId: String!
      userId: String!
      isActive: Boolean!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      member(chatIds: [String]!): Member!
    }

    extend type Query {
      members(chatIds: [String], userIds: [String]): [Member]
    }

    extend type Mutation {
      insertMember(objectId: String!, chatId: String!, userId: String!, isActive: Boolean!, createdAt: Int!, updatedAt: Int!): Member!
      updateMember(objectId: String!, chatId: String!, userId: String!, isActive: Boolean!, createdAt: Int!, updatedAt: Int!): Member!
    }
  `
}

const MEMBER_CHANGE = 'MEMBER_CHANGE';

module.exports.createMemberResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      member: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(MEMBER_CHANGE),
          (payload, args) => args.chatIds.indexOf(payload.chatId) > -1
        )
      }
    },
    Query: {
      members: async(root, args) => {
        let filter = { }
        if (args.chatIds) {
          filter = { 
            chatId: { 
              [Operation.in]: args.chatIds
            }
          }
        } else if (args.userIds) {
          filter = { 
            userId: { 
              [Operation.in]: args.userIds
            }
          }
        }
        return await database.models.Member.findAll({ where: filter });
      }
    },
    Mutation: {
      insertMember: async(root, args, context, info) => {
        let member = await database.models.Member.create(args);
        pubsub.publish(MEMBER_CHANGE, {
          chatId: args.chatId,
          member: member.dataValues 
        });
        return member;
      },
      updateMember: async(root, args, context, info) => {
        const filter = { 
          where: { 
            [Operation.and]: [ 
              { chatId: args.chatId }, 
              { userId: args.userId } 
            ]
          }
        }
        await database.models.Member.update(args, filter)
          .then(() => {
            pubsub.publish(MEMBER_CHANGE, {
              chatId: args.chatId,
              member: args
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