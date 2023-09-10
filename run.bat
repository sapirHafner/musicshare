
cd frontend
start /B npm install
start /B npm start
cd ..

cd backend\mongodb
start /B mongodb --dbpath .\data\db
cd ..

cd server
start /B npm install
npm start
cd ..