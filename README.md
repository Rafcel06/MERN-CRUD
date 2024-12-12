
Deploying a MERN in LINUX 

1. Update and Upgrade Your System

   - sudo apt update
   - sudo apt upgrade

2. Install Node.js and npm


   - curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   - sudo apt install -y nodejs

   Verify the installation:

   - node -v
   - npm -v


3. Install MySQL 

   - sudo apt install -y mysql-server

   Secure MySQL installation:

   - sudo mysql_secure_installation

   After installation login to your mysql remote server and create database and table 

   - mysql -u root -p

   - CREATE DATABASE users;
   - USE users
   
   CREATE TABLE `person` (
   `id` int(11) NOT NULL,
   `first_name` varchar(50) NOT NULL,
   `last_name` varchar(50) NOT NULL,
   `email` varchar(100) NOT NULL,
   `archived` int(11) DEFAULT 0,
   `inactive` int(11) DEFAULT 0,
   `archived_by` varchar(255) DEFAULT NULL,
   `deleted_by` varchar(255) DEFAULT NULL,
   `dt_inserted` datetime DEFAULT NULL,
   `dt_updated` datetime DEFAULT NULL,
   `dt_deleted` datetime DEFAULT NULL,) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;   
   
   EXIT;
     

4. You Folder Struture must be this 

   Folder >   frontend
              backend

   In your main.js of Backend add this code 

   if (process.env.NODE_ENV === 'production') {
       app.use(express.static(path.join(__dirname, '../frontend/build')));

   app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend/', 'build', 'index.html')
    )
   );
   } else {
    app.get('/', (req, res) => res.send('Please set to production'));
   }

  The Code above allow you to load the frontend UI using backend 

5. Navigate to frontend folder then type this command 

   - npm install --force

   Then navigate to backend and execute the command 

   - npm install


APACHE2 set up  

6. Install and Configure Apache2 
   
   Install Apache2


   - sudo apt install -y apache2

     Install mod_proxy Modules
     Enable the necessary Apache modules


   - sudo a2enmod proxy
   - sudo a2enmod proxy_http
   - sudo systemctl restart apache2

   Configure Apache as a Reverse Proxy
   Create a new Apache configuration file for your site:


   - sudo nano /etc/apache2/sites-available/your-app.conf

   Add the following configuration:


   <VirtualHost *:80>
       ServerAdmin yourdomain.com
       ServerName yourdomain.com

       ProxyPreserveHost On
       ProxyPass / http://localhost:4001/
       ProxyPassReverse / http://localhost:4001/

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>

   Enable your site and restart Apache:


   - sudo a2ensite your-app.conf
   - sudo systemctl restart apache2

7. Install PM2	 

   - sudo npm install -g pm2

   Start your application with PM2

   - pm2 start main.js 
   - pm2 startup
   - pm2 save




