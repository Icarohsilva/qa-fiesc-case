FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html/public
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80