mongo test --eval 'db.users.drop()'
mongoimport --db test --collection users --type json --file /vagrant/seeds/users.json --jsonArray
