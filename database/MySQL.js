/*** 
 * 
 * 
 * Importing Dependencies
 * 
 */
import Sequelize from 'sequelize';
import _ from 'lodash';
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
const Conn = new Sequelize(
  'messenger',
  'root',
  'Related123',
  {
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