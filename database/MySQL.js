/*** 
 * 
 * 
 * Importing Dependencies
 * 
 */
import Sequelize from 'sequelize';
import _ from 'lodash';
const args = require('minimist')(process.argv.slice(2), {
  string: 'database',
  string: 'user',
  string: 'password',
  int: 'databasePort'
});
import { createFriend } from './tables/Friend';
import { createPerson } from './tables/Person';
import { createBlocked } from './tables/Blocked';
import { createDetail } from './tables/Detail';
import { createGroup } from './tables/Group';
import { createMember } from './tables/Member'; 
import { createMessage } from './tables/Message'; 
import { createSingle } from './tables/Single'; 

/*** 
 * 
 * 
 * Database Connection
 * 
 */
const database = args.database || 'relatedmessenger';
const user = args.user || 'remote';
const password = args.password || 'Related123';
const port = args.databasePort || 3306;

const Conn = new Sequelize(
  database,
  user,
  password,
  {
    port: port,
    dialect: 'mysql',
    host: 'localhost'
  }
);

/***
 * 
 * 
 * Database Objects
 * 
 */

createFriend(Conn, Sequelize);
createPerson(Conn, Sequelize);
createBlocked(Conn, Sequelize);
createDetail(Conn, Sequelize);
createGroup(Conn, Sequelize);
createMember(Conn, Sequelize);
createMessage(Conn, Sequelize);
createSingle(Conn, Sequelize);

Conn.sync({ force: false }).then(() => {
});

export default Conn;