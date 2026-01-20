## Billing Software by DevEnv Tech

npx prisma migrate dev  

npx prisma db seed 

## STEPS

1. create a Client
2. create a License with plan for Client (Monthly or Yearly), license with hardcoded 5 validity
3. create invoice for the client who have a plan
4. send(Mail) and Download the Invoice

## SETUP

## .env and .env.local

DATABASE_URL="mysql://root:root@localhost:3306/linea"
DATABASE_USER="root"
DATABASE_PASSWORD="root"
DATABASE_NAME="linea"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

## Email configuration check env files
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=re_*************************************
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=onboarding@resend.dev
RESEND_API_KEY=re_**********************************
