cd frontend
npm install &
npm start &
cd ../backend/mongodb/
pwd
mongod --dbpath ./data/db &
cd ../server/
npm install &
npm start