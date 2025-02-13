sudo certbot certonly --standalone -d facturagpt.com -d www.facturagpt.com


git credential reject https://github.com
git pull --tags origin test-carlos


kill -9 $(lsof -t -i:3004)


pm2 start npm --name "frontend" -- run start
pm2 start app/index.js --name "backend"

npm run start && nodemon service app/service