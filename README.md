# Related Code Messenger Server for MySQL XX

Node.js server with Apollo GraphQL and MySQL.

## Improvements and Fixes in 1.0.9

- Server-side:
    - Blocked and Blocker subscription name changed to blockeds.
    - Blocked query now accepts two parameters to filter wich is blockerId and blockedId, if both  parameters are null so the query wont will filter.
    - Unified the queries Blockeds and Blockers into one.
    - Unified the Blocked and Blocker subscription into one.
    - Details subscription name changed to details.
    - Details query name changed to details and changed the parameter to be chatIds.
    - Fixed Details update mutation by adding a new parameter for filtering.
    - Friends subscription name change to friends
    - Fixed Friends update mutation by adding a new parameter for filtering.
    - Fixed a bug in Groups mutations insert and update in database.
    - Groups subscription name changed to groups.
    - Added chatIds parameter to the Groups query.
    - Members subscription name changed from memberChanged to members.
    - Members query now accepts two parameters to filter which is userIds and chatIds, if both  parameters are null so the query wont will filter.
    - Messages subscription name changed to messages
    - Messages query now has two parameters which is chatIds and updatedAt.
    - Added a parameter in  Messages update mutation to ensure that the right row will be updated.
    - Person subscription name changed to people.
    - Person query changed to people.
    - Single subscription name changed to singles.
    - Unified the Single1 and Single2 subscription into one.
    - Unified the queries Single1 and Single2 into one.
    - Single queries name changed to singles.
  - Client-side:
    - All the subscription were renamed from SomethingChangedSubscription to SomethingSubscription.
    - All the queries names and parameters were standardized.
    - All the responses from queries and subscriptions renamed to object and objects.

## To be done

- Add Int64 support to both server and client side.

## DigitalOcean Installation

1. Sign-in in to your DigitalOcean account.
2. Select Create -> Droplet for creating a new droplet.
3. From Distributions list please select CentOS.
4. Choose the plan and the datacenter region that meet your requirements.
5. Also please alter the remaining options regarding to your needs.
6. Click on Create Droplet.

7. Select Networking -> Firewalls -> Create Firewall.
8. Set a name to your new Firewall.
9. Add a Custom inbound rule with the TCP protocol using the port number 3001.
10. Add a MySQL inbound rule with the TCP protocol using the port number 3306.
11. Scroll down to the bottom of the page and apply the Firewall to the recently created droplet.
12. Click on Create Firewall.

13. Sign-in to your droplet via terminal using root user.
14. Create a folder called Server using<br>`mkdir Server`
15. Enter the folder called Server using<br>`cd Server`
16. Install Node.js using<br>`yum install -y nodejs git`
17. Start the MySQL installation with<br>`rpm -Uvh https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm`
18. Continue the MySQL installation with<br>`sed -i 's/enabled=1/enabled=0/' /etc/yum.repos.d/mysql-community.repo`
19. Finish the MySQL installation with<br>`yum --enablerepo=mysql80-community install -y mysql-server`

20. Start the MySQL Service using<br>`service mysqld start`
21. Configure MySQL using<br>`mysql_secure_installation`
22. Answer the following questions as described below.<br>
- Would you like to setup VALIDATE PASSWORD component? - `No`
- Please set the password for root here. New password: - `Related123`
- Remove anonymous users? - `Yes`
- Disallow root login remotely? - `No`
- Remove test database and access to it? - `Yes`
- Reload privilege tables now? - `Yes`

23. Enter MySQL console using<br>`mysql -u root -p`
24. Enter the MySQL password provided earlier<br>`Related123`
25. Create the database using<br>`CREATE DATABASE relatedmessenger;`
26. Create remote user using<br>`CREATE USER 'remote'@'%' IDENTIFIED BY 'Related123';`
27. Grant privileges to remote user with<br>`GRANT ALL PRIVILEGES ON *.* TO 'remote'@'%' WITH GRANT OPTION;`
28. Flush privileges using<br>`FLUSH PRIVILEGES;`
29. Exit MySQL console using<br>`EXIT;`

30. Clone the following GitHub repo using<br>`git clone https://github.com/carloschfa/related-messenger-apollo-mysql-server`
31. Enter the cloned repo folder with<br>`cd related-messenger-apollo-mysql-server`
32. Install the predefined packages using<br>`npm install`
33. Install PM2 using<br>`npm install pm2 -g`
34. Start the Apollo server with<br>`pm2 start index.js`

35. You can exit from the droplet using<br>`exit`

## Apollo GraphQL admin page

You can check the Apollo GraphQL admin page from your browser entering the server ip address with the port number (like this: http://your-server-ip-address:3001).

## Remote Database Access

To connect your Database remotely using a Database Manager application, please use the following values:

- Host: your-server-ip-address
- Port: 3306
- User: remote
- Password: Related123
- Schema: relatedmessenger

## Client installation

In your local machine follow these steps.

1. You need to install the `apollo-codegen` globally first, with Node.js installed run this command:
````
npm install -g apollo-codegen
````
2. Clone this repository with `git clone https://github.com/carloschfa/related-messenger-apollo-mysql-server`.

3. After in the terminal go to `database/client/` and run this command:
````
apollo codegen:generate --target=swift --includes="*.graphql" --localSchemaFile="schema.json" API.swift
````

4.  It will generate the API.swift file. 
Now you just drag it to your project.

5. Now go to your `AppDelegate.swift` and add this code above the `@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate`:
````
import Apollo

let graphQLEndpoint = "http://SERVERIP:SERVERPORT/graphql"
let apollo: ApolloClient = {
    let configuration = URLSessionConfiguration.default
    let wsEndpointURL = URL(string: "ws://SERVERIP:SERVERPORT/graphql")!
    let endpointURL = URL(string: graphQLEndpoint)!
    let websocket = WebSocketTransport(request: URLRequest(url: wsEndpointURL), connectingPayload: nil)
    let splitNetworkTransport = SplitNetworkTransport(
        httpNetworkTransport: HTTPNetworkTransport(
            url: endpointURL
        ),
        webSocketNetworkTransport: websocket
    )
  return ApolloClient(networkTransport: splitNetworkTransport)
}()
````

Don't forget to replace the `SERVERIP` and  `SERVERPORT` for the values of yout server.

Then you can run it.

### Tech

This server uses a number of open source projects to work properly:

* [Node.js] - evented I/O for the backend
* [Apollo GraphQL](https://www.apollographql.com/) - GraphQL server.
* [MySQL2](https://www.npmjs.com/package/mysql2) - MySQL connector.
* [Sequelize](https://sequelize.org/) - Database ORM.
* [ESM](https://www.npmjs.com/package/esm) - Babel-less module loader.


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
