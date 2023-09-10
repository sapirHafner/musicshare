cd frontend
npm install &
npm start &
cd ../backend/mongodb/
mongod --dbpath ./data/db &
cd ../server/
npm install &
npm start