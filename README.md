
Deploying MERN STACK in LINUX 

1. Update and Upgrade System
Start by updating and upgrading your system:

bash
Copy code
sudo apt update
sudo apt upgrade
2. Install Node.js and npm
Install Node.js and npm:

bash
Copy code
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
Verify the installation:

bash
Copy code
node -v
npm -v
3. Install MySQL and Configure Database
Install MySQL server:

bash
Copy code
sudo apt install -y mysql-server
Secure your MySQL installation:

bash
Copy code
sudo mysql_secure_installation
Log in to MySQL to create a database:

bash
Copy code
mysql -u root -p
Create a database and table for your application:

sql
Copy code
CREATE DATABASE users;
USE users;
CREATE TABLE person (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

EXIT;
4. Project Folder Structure
Ensure your project folder structure looks like this:

Copy code
Folder/
│
├── frontend/
└── backend/
5. Backend Configuration (main.js)
In your main.js file of the backend, include the following code to serve the frontend build for server-side rendering:

javascript
Copy code
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
6. Install Frontend and Backend Dependencies
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd frontend
npm install --force
Then, navigate to the backend directory and install dependencies:

bash
Copy code
cd ../backend
npm install
7. Install Apache2 and Set Up Reverse Proxy
Install Apache2:
bash
Copy code
sudo apt install -y apache2
Enable Apache Modules:
Enable necessary modules for proxying:

bash
Copy code
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
Configure Apache VirtualHost:
Create a new Apache configuration file for your site:

bash
Copy code
sudo nano /etc/apache2/sites-available/your-app.conf
Add the following configuration to set up Apache as a reverse proxy for your MERN app:

apache
Copy code
<VirtualHost *:80>
    ServerAdmin yourdomain.com
    ServerName yourdomain.com

    DocumentRoot /var/www/your-app  # This is the DocumentRoot for your application

    ProxyPreserveHost On
    ProxyPass / http://localhost:4001/
    ProxyPassReverse / http://localhost:4001/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
Replace /var/www/your-app with the path where your application’s static files or other resources are located.
The ProxyPass and ProxyPassReverse directives forward requests to the Node.js backend running on port 4001.
Enable the Site and Restart Apache:
Enable your site configuration and restart Apache to apply changes:

bash
Copy code
sudo a2ensite your-app.conf
sudo systemctl restart apache2
8. Install PM2 and Start Application
Install PM2 globally to manage your Node.js application:

bash
Copy code
sudo npm install -g pm2
Start your application with PM2:

bash
Copy code
pm2 start backend/main.js  # Make sure the correct path to your main.js is used
pm2 startup
pm2 save





