# Zix

//TOCHANGE 

|简述|描述|
|--|--|
|作者|khazix
|框架|zix+vue
|版本|1.0
|日期|2020-01-02

### INSTALL

##### Apache

edit vhost.conf

```
<VirtualHost *:80>
    SetEnv ZIX_HOME /path/to/zix
    SetEnv ZIX_ENV 'development'
</VirtualHost>
```

edit .htaccess in project root

```
RewriteEngine On
RewriteBase /

# Allow any files or directories that exist to be displayed directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^(.*)$ public/?$1 [QSA,L]
```

##### Nginx

edit vhost.conf

```
//rewrite rules
if ($request_uri !~ (/view/|/test/)  ){
    rewrite ^(.*)$ /public/index.php break;
}


location ~ \.php$ {
    fastcgi_param ZIX_HOME /path/to/zix;
    fastcgi_param ZIX_ENV development;
}
```
