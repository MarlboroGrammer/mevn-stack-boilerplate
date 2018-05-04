mongoimport --db pharmakeys --collection delegate --file delegate.json
mongoimport --db pharmakeys --collection credentials --file credentials.json
cd client && start npm install && cd ../server && start npm install