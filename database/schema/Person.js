module.exports.createPersonSchema = function (gql) {
  return PersonSchema = gql`
    type Person {
      email: String!
      phone: String!
      firstname: String!
      lastname: String!
      fullname: String!
      country: String!
      location: String!
      pictureAt: Int!
      status: String!
      keepMedia: Int!
      networkPhoto: Int!
      networkVideo: Int!
      networkAudio: Int!
      wallpaper: String!
      loginMethod: String!
      oneSignalId: String!
      lastActive: Int!
      lastTerminate: Int!
      createdAt: Int!
      updatedAt: Int!
    }

    extend type Subscription {
      person(updatedAt: Int!): Person!
    }

    extend type Query {
      people(updatedAt: Int!): [Person]
    }

    extend type Mutation {
      insertPerson(email: String!, phone: String!, firstname: String!, lastname: String!, fullname: String!, country: String!, location: String!, pictureAt: Int!, status: String!, keepMedia: Int!, networkPhoto: Int!, networkVideo: Int!, networkAudio: Int!, wallpaper: String!, loginMethod: String!, oneSignalId: String!, lastActive: Int!, lastTerminate: Int!, createdAt: Int!, updatedAt: Int!): Person!
      updatePerson(email: String!, phone: String!, firstname: String!, lastname: String!, fullname: String!, country: String!, location: String!, pictureAt: Int!, status: String!, keepMedia: Int!, networkPhoto: Int!, networkVideo: Int!, networkAudio: Int!, wallpaper: String!, loginMethod: String!, oneSignalId: String!, lastActive: Int!, lastTerminate: Int!, createdAt: Int!, updatedAt: Int!): Person!
    }
  `
}

const PERSON_CHANGE = 'PERSON_CHANGE';

module.exports.createPersonResolver = function (database, Operation, withFilter, pubsub) {
  return resolver = {
    Subscription: {
      person: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(PERSON_CHANGE),
          (payload, args) => { 
            return payload.updatedAt > args.updatedAt }
        )
      }
    },
    Query: {
      people: async(root, args) => {
        let filter = { 
          updatedAt: { 
            [Operation.gt]: args.updatedAt
          }
        }
        return await database.models.Person.findAll({ where: filter });
      }
    },
    Mutation: {
      insertPerson: async(root, args, context, info) => {
        let person = await database.models.Person.create(args);
        pubsub.publish(PERSON_CHANGE, {
          updatedAt: args.updatedAt,
          person: person.dataValues
        });
        return person;
      },
      updatePerson: async(root, args, context, info) => {
        const filter = { where: { email: args.email } }
        await database.models.Person.update(args, filter)
          .then(() => {
            pubsub.publish(PERSON_CHANGE, {
              updatedAt: args.updatedAt,
              person: args
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