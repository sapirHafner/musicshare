cd frontend
npm start &
cd ../backend/mongodb/
mongod --dbpath /Users/apiiro/Desktop/Ilay/Code/musicshare/backend/mongodb/data/db &
cd ../server/
npm start