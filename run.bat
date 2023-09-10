@echo off
cd frontend
npm install
start npm start
cd ..

cd backend\mongodb
pwd
start mongodb --dbpath .\data\db
cd ..

cd server
npm install
start npm start
cd ..