
Deploying MERN STACK in LINUX 

Update and Upgrade System

Run  `sudo apt update`
     `sudo apt upgrade`

Install Node.js and npm

Run  `url -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
     `sudo apt install -y nodejs`

Verify the installation:
  
Run  `node -v`
     `npm -v`


Install MySQL and Configure Database

Run  `sudo apt install -y mysql-server`

Secure your MySQL installation:

Run  `sudo mysql_secure_installation`
 
Log in to MySQL to create a database:

Run  `mysql -u root -p`

Create a database and table for your application

Run `CREATE DATABASE users;`
    `USE users;`

    `CREATE TABLE person (
         id int(11) NOT NULL,
         first_name varchar(50) NOT NULL,
         last_name varchar(50) NOT NULL,
         email varchar(100) NOT NULL,
         archived int(11) DEFAULT 0,
         inactive int(11) DEFAULT 0,
         archived_by varchar(255) DEFAULT NULL,
         deleted_by varchar(255) DEFAULT NULL,
         dt_inserted datetime DEFAULT NULL,
         dt_updated datetime DEFAULT NULL,
         dt_deleted datetime DEFAULT NULL
         ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`

    `EXIT;`

  
4. Project Folder Structure
  
    Folder/
   │
   ├── frontend/
   └── backend/
   
5. Backend Configuration (main.js)

In your main.js file of the backend, include the following code to serve the frontend build for server-side rendering

Run  `if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../frontend/build')));

        app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
      );
      } else {
         app.get('/', (req, res) => res.send('Please set to production')); 
      }`

6. Install Frontend and Backend Dependencies
   
   Navigate to the frontend directory and install dependencies

Run  `cd frontend`
     `npm install --force`
   
Then, navigate to the backend directory and install dependencies

Run  `cd ../backend`
     `npm install`
  
     
7. Install Apache2 and Set Up Reverse Proxy

Run  `sudo apt install -y apache2`

     `sudo a2enmod proxy`
     `sudo a2enmod proxy_http`
     `sudo systemctl restart apache2`

   
Configure Apache VirtualHost:
Create a new Apache configuration file for your site:


Run  `sudo nano /etc/apache2/sites-available/your-app.conf`
      
Add the following configuration to set up Apache as a reverse proxy for your MERN App


Run  `<VirtualHost *:80>
       ServerAdmin webmaster@localhost
       ServerAdmin yourdomain.com
       ServerName yourdomain.com

       DocumentRoot /var/www/your-app  # This is the DocumentRoot for your application the place where your project folder found

       ProxyPreserveHost On
       ProxyPass / http://localhost:4001/
       ProxyPassReverse / http://localhost:4001/

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
      </VirtualHost>`

 
After configuration enable the .conf you created that confugure your application

Run  
     `sudo a2ensite your-app.conf` 
     `sudo systemctl restart apache2`


    
8. Install PM2 and Start Application

Install PM2 globally to manage your Node.js application:

Run  `sudo npm install -g pm2`

Start your application with PM2:

Run  `pm2 start backend/main.js`  

# Make sure the correct path to your main.js is used

Run  `pm2 startup`
     `pm2 save`


9. If you already have domain and pointed it in your linux remote ubuntu IP 

Start Installing Certbot 

Run  `sudo apt install certbot python3-certbot-apache`
     `sudo certbot --apache`

Enter Your email to know the expiration of SSL agree to term and condition 
This will Automatically configure your Apache server for SSL.

For Automatic SSL Certificate Renewal

Run  `sudo certbot renew --dry-run`


 





