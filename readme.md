sudo certbot certonly --standalone -d facturagpt.com -d www.facturagpt.com

kill -9 $(lsof -t -i:3004)