import MySQLDataBase from './database/MySQL';
const { 
  ApolloServer,
  gql,
  makeExecutableSchema,
  withFilter,
  PubSub
 } = require('apollo-server');
const Op = require('sequelize').Op;
const { merge } = require('lodash');
const pubsub = new PubSub();
const args = require('minimist')(process.argv.slice(2));

/***
 * 
 * Friend
 */
import { 
  createFriendSchema, 
  createFriendResolver
} from './database/schema/Friend'
let friendSchema = createFriendSchema(gql);
let friendResolver = createFriendResolver(MySQLDataBase, Op, withFilter, pubsub);

/***
 * 
 * Person
 */
import { 
  createPersonSchema, 
  createPersonResolver
} from './database/schema/Person'
let personSchema = createPersonSchema(gql);
let personResolver = createPersonResolver(MySQLDataBase, Op, withFilter, pubsub);


/***
 * 
 * Blocked
 */
import { 
  createBlockedSchema, 
  createBlockedResolver
} from './database/schema/Blocked'
let blockedSchema = createBlockedSchema(gql);
let blockedResolver = createBlockedResolver(MySQLDataBase, Op, withFilter, pubsub);


/***
 * 
 * Detail
 */
import { 
  createDetailSchema, 
  createDetailResolver
} from './database/schema/Detail'
let detailSchema = createDetailSchema(gql);
let detailResolver = createDetailResolver(MySQLDataBase, Op, withFilter, pubsub);


/***
 * 
 * Group
 */
import { 
  createGroupSchema, 
  createGroupResolver
} from './database/schema/Group'
let groupSchema = createGroupSchema(gql);
let groupResolver = createGroupResolver(MySQLDataBase, Op, withFilter, pubsub);

/***
 * 
 * Member
 */
import { 
  createMemberSchema, 
  createMemberResolver
} from './database/schema/Member'
let memberSchema = createMemberSchema(gql);
let memberResolver = createMemberResolver(MySQLDataBase, Op, withFilter, pubsub);

/***
 * 
 * Message
 */
import { 
  createMessageSchema, 
  createMessageResolver
} from './database/schema/Message'
let messageSchema = createMessageSchema(gql);
let messageResolver = createMessageResolver(MySQLDataBase, Op, withFilter, pubsub);


/***
 * 
 * Single
 */
import { 
  createSingleSchema, 
  createSingleResolver
} from './database/schema/Single'
let singleSchema = createSingleSchema(gql);
let singleResolver = createSingleResolver(MySQLDataBase, Op, withFilter, pubsub);


/***
 * 
 * Resolvers
 */
const resolvers = merge(
  friendResolver, 
  personResolver, 
  blockedResolver, 
  detailResolver, 
  groupResolver,
  memberResolver,
  messageResolver,
  singleResolver);


/***
 * 
 * Schemas
 */
const schema = makeExecutableSchema({
  typeDefs: [
    friendSchema, 
    personSchema, 
    blockedSchema, 
    detailSchema, 
    groupSchema,
    memberSchema,
    messageSchema,
    singleSchema],
  resolvers
});

/***
 * 
 * Apollo Server Constructor
 */
const apolloServer = new ApolloServer({
  schema  
});

/***
 * 
 * Apollo Server Initiator
 */

let port = args['port'] | 3001

apolloServer.listen(port).then(({ url }) => console.log(`Server running at ${ url } and subscriptions at ${ apolloServer.subscriptionsPath }`));

