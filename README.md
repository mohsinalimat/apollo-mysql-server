# Apollo MySQL Server

Node.js server with Apollo GraphQL and MySQL.

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
24. Enter the MySQL password provided recently<br>`Related123`
25. Create the database using<br>`CREATE DATABASE messenger;`
26. Create remote user using<br>`CREATE USER 'remote'@'%' IDENTIFIED BY 'Related123';`
27. Grant privileges to remote user with<br>`GRANT ALL PRIVILEGES ON *.* TO 'remote'@'%' WITH GRANT OPTION;`
28. Flush privileges using<br>`FLUSH PRIVILEGES;`
29. Exit MySQL console using<br>`EXIT;`

30. Clone the following GitHub repo using<br>`git clone https://github.com/relatedcode/apollo-mysql-server`
31. Enter the cloned repo folder with<br>`cd apollo-mysql-server`
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
- Database: messenger
