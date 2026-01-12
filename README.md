# Expense Tracker 

A full-stack expense tracking application built with React, Node.js, PostgreSQL, and integrated with premium features like payment gateway and email notifications.
services used - AWS S3, AWS RDS, AWS EC2 , cashfree payments and Brevo ( for emails)

## Features

- **User Authentication & Authorization**
  - Secure login and signup with JWT tokens
  - Password reset functionality via email
  - Protected routes and user sessions

- **Expense Management**
  - Add, edit, and delete expenses
  - Leaderboard 
  - Categorize expenses for better organization

- **Premium Membership**
  - Integrated Cashfree payment gateway
  - Unlock premium features with subscription

- **Reports & Analytics**
  - Generate detailed expense reports
  - Download reports in multiple formats

- **Email Notifications**
  - Password reset emails via Brevo
  - Transaction confirmations


## Technology Stack

**Frontend:**
- React with Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js with Express
- PostgreSQL database
- JWT authentication
- Sequelize ORM

**Third-Party Services:**
- Brevo (Email service)
- Cashfree (Payment gateway)
- AWS (Deployment)

---

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Git

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/Vedu544/sharpener_activities.git
cd sharpener_activities
git checkout expense-tracker
```

#### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory with the following variables:

```env
PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=

JWT_SECRET=

BREVO_API_KEY=
SENDER_EMAIL=
SENDER_NAME=

FRONTEND_URL=

# Cashfree Payment Gateway
CASHFREE_APP_ID=
CASHFREE_SECRET_KEY=
CASHFREE_ENV=
```

Run database migrations:

```bash
npx sequelize-cli db:migrate
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:8000` (or your specified PORT).

#### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/my-project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

#### 4. Test Locally

Open your browser and navigate to `http://localhost:5173` to test the application.

---

## Deployment Guide

### AWS EC2 Setup (Backend)

#### 1. Create AWS Account and Launch EC2 Instance

1. Sign up for AWS account at https://aws.amazon.com
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Configure instance:
   - **Name:** expense-tracker-backend
   - **AMI:** Ubuntu Server 24.04 LTS
   - **Instance type:** t2.micro (free tier eligible)
   - **Key pair:** Create new key pair and download `.pem` file
   - **Security Group:** Create/configure with the following rules:
     - SSH (Port 22) - Your IP
     - HTTP (Port 80) - Anywhere
     - HTTPS (Port 443) - Anywhere
     - Custom TCP (Port 8000) - Anywhere (for API)

#### 2. Connect to EC2 Instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@ec2-xx-xx-xx-xx.compute-1.amazonaws.com
```

#### 3. Install Dependencies on EC2

Update system packages:

```bash
sudo apt update && sudo apt upgrade -y
```

Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Install Nginx:

```bash
sudo apt install nginx -y
```

Install PM2 (Process Manager):

```bash
sudo npm install -g pm2
```

#### 4. Deploy Backend Code

Create directory for backend:

```bash
cd /var/www
sudo mkdir expense-backend
sudo chown ubuntu:ubuntu expense-backend
cd expense-backend
```

Clone your repository:

```bash
git clone https://github.com/Vedu544/sharpener_activities.git .
git checkout expense-tracker
cd backend
npm install
```

Create `.env` file:

```bash
nano .env
```

Add your production environment variables (use AWS RDS credentials for database).

Run migrations:

```bash
npx sequelize-cli db:migrate
```

#### 5. Start Backend with PM2

```bash
pm2 start src/index.js --name expense-api
pm2 save
pm2 startup
```

Follow the instructions from `pm2 startup` command to enable PM2 on system reboot.

#### 6. Configure Nginx as Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/expense-api
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # or use EC2 public DNS

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/expense-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### AWS S3 Setup (Frontend)

#### 1. Build the React App

On your local machine, build the production version:

```bash
cd frontend/my-project
npm run build
```

#### 2. Create S3 Bucket

1. Go to AWS Console → S3
2. Click "Create bucket"
3. Configure bucket:
   - **Bucket name:** expense-tracker-frontend (must be unique globally)
   - **Region:** Same as your EC2 instance (recommended)
   - **Block Public Access:** Uncheck "Block all public access" and acknowledge
4. Click "Create bucket"

#### 3. Enable Static Website Hosting

1. Open your bucket
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable static website hosting
6. Set:
   - **Index document:** `index.html`
   - **Error document:** `index.html` (for SPA routing)
7. Save changes
8. Note the **Bucket website endpoint** URL

#### 4. Set Bucket Policy for Public Access

1. Go to "Permissions" tab
2. Click "Bucket Policy"
3. Add the following policy (replace `your-bucket-name`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

#### 5. Upload Build Files

1. Go to "Objects" tab
2. Click "Upload"
3. Upload all files from your `build/` or `dist/` folder
4. Click "Upload"

#### 6. Update Frontend Environment Variable

Make sure your React app's API base URL points to your EC2 backend URL. Update the build with the correct production API URL before uploading to S3.

#### 7. Test Your Deployment

Visit your S3 static website endpoint URL to access the application.

---

### AWS RDS Setup (Database)

#### 1. Create RDS Instance

1. Go to AWS Console → RDS
2. Click "Create database"
3. Choose database creation method: **Standard Create**
4. Engine options:
   - **Engine type:** PostgreSQL
   - **Version:** Latest stable version
5. Templates: **Free tier** (if eligible)
6. Settings:
   - **DB instance identifier:** expense-tracker-db
   - **Master username:** postgres (or your choice)
   - **Master password:** Create a strong password

#### 2. Configure Instance Settings

1. DB instance class: **db.t3.micro** (or db.t4g.micro for free tier)
2. Storage: 20 GB (default)
3. Connectivity:
   - **VPC:** Default VPC
   - **Public access:** Yes (for initial setup)
   - **VPC security group:** Select the same security group as your EC2 instance
   - **Availability Zone:** Same as EC2

#### 3. Configure Security Group

1. Go to EC2 → Security Groups
2. Edit inbound rules of your RDS security group
3. Add rule:
   - **Type:** PostgreSQL
   - **Protocol:** TCP
   - **Port:** 5432
   - **Source:** Select the security group of your EC2 instance (or EC2's private IP)

This allows only your EC2 instance to connect to the database.

#### 4. Additional Configuration

1. Database options:
   - **Initial database name:** expense_tracker
2. Backup: Enable automatic backups (7 days retention recommended)
3. Encryption: Enable encryption at rest (recommended)
4. Click "Create database"

#### 5. Download SSL Certificate (optional, skip if you want)

If using SSL connections (recommended):

```bash
cd /home/ubuntu
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
```

#### 6. Update Backend Environment Variables

Once the RDS instance is created, update your `.env` file on EC2:

```env
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432
DB_NAME=expense_tracker
DB_USER=postgres
DB_PASSWORD=your-master-password
```

Restart your backend:

```bash
pm2 restart expense-api
```

---

### Brevo Email Service Setup

#### 1. Create Brevo Account

1. Go to https://www.brevo.com
2. Sign up for a free account
3. Verify your email address

#### 2. Get API Key

1. Log in to Brevo dashboard
2. Go to "Settings" → "SMTP & API"
3. Click "Generate a new API key"
4. Copy the API key
5. Add it to your backend `.env` file:

```env
BREVO_API_KEY=your-brevo-api-key
```

#### 3. Verify Sender Email

1. Go to "Senders" section
2. Add your sender email address
3. Verify the email by clicking the verification link sent to your inbox

#### 4. Configure Sender Details

Update your `.env` file:

```env
SENDER_EMAIL=your-verified-email@example.com
SENDER_NAME=Expense Tracker
```

#### 5. Set Email Templates (Optional)

1. Go to "Campaigns" → "Templates"
2. Create templates for:
   - Welcome email
   - Password reset email
   - Transaction confirmation
3. Use dynamic content for personalization

#### 6. Test Email Functionality

Send a test email from your application to ensure the integration works properly.

---

### Cashfree Payment Gateway Setup

#### 1. Create Cashfree Account

1. Go to https://www.cashfree.com
2. Sign up for a merchant account
3. Complete KYC verification

#### 2. Get API Credentials

1. Log in to Cashfree dashboard
2. Go to "Developers" → "API Keys"
3. For testing:
   - Use **Sandbox** environment
   - Copy the App ID and Secret Key
4. Add credentials to `.env`:

```env
CASHFREE_APP_ID=your-app-id
CASHFREE_SECRET_KEY=your-secret-key
CASHFREE_ENV=sandbox
```

#### 3. Configure Webhook URL

1. In Cashfree dashboard, go to "Developers" → "Webhooks"
2. Add your backend webhook URL:
   ```
   https://your-backend-url.com/api/payment/webhook
   ```
3. Select events to track (payment success, failure, etc.)

#### 4. Set Up Payment Plans

1. Go to "Subscriptions" or "Payment Plans"
2. Create plans for your premium membership
3. Note the plan IDs for use in your application

#### 5. Test Payment Flow

1. Use Cashfree's test card details for sandbox testing
2. Test cards are available in Cashfree documentation
3. Verify webhook responses are received correctly

#### 6. Go Live

Once testing is complete:
1. Switch to **Production** environment
2. Update `.env`:
```env
CASHFREE_ENV=production
```
3. Use production API credentials
4. Complete any additional compliance requirements

---

## Live Demo

Frontend: http://01-expense-tracker.s3-website.ap-south-1.amazonaws.com/login


## Security Best Practices

- Never commit `.env` files to version control
- Use strong passwords for database and JWT secrets
- Enable HTTPS for production (use Let's Encrypt with Certbot)
- Regularly update dependencies
- Implement rate limiting on API endpoints
- Sanitize user inputs to prevent SQL injection
- Keep API keys secure and rotate them periodically

---

## Troubleshooting

### Backend Issues

- **Port already in use:** Change the PORT in `.env` file
- **Database connection failed:** Verify PostgreSQL credentials and check if the service is running
- **Migration errors:** Ensure database exists and credentials are correct

### Frontend Issues

- **API calls failing:** Check VITE_API_BASE_URL in `.env`
- **Build errors:** Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Deployment Issues

- **EC2 connection timeout:** Check security group rules and ensure port 22 is open
- **Nginx 502 error:** Verify backend is running with `pm2 status`
- **S3 403 errors:** Check bucket policy and ensure public access is enabled

---

## Contributing

This project was developed as part of the Sharpener Full Stack Development Course. It demonstrates proficiency in building modern web applications with React, Node.js, and cloud deployment on AWS.

### Key Learning Outcomes

- Building RESTful APIs with Express.js
- Implementing JWT-based authentication
- Working with relational databases (PostgreSQL)
- Integrating third-party services (payment gateways, email)
- Cloud deployment and DevOps basics
- Frontend state management and routing
- Responsive UI design



**Note:** This is a learning project developed as part of the Sharpener Full Stack Development Course. It showcases practical implementation of modern web development technologies and best practices for building production-ready applications.
