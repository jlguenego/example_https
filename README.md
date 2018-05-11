# example_https

## HTTPS on your development machine

First you need to generate a Root Authority (RA) certificate, and then a certificate for 'localhost'.

```
$ cd ./config-https
$ bash getCA.sh
$ cd ..
$ cp https.dev.config.js config.js
```

You install the RA Certificate in you google chrome in the "Manage Certificates" > "Trusted Root Certification Authorities".

You can then start the server:
```
$ npm start
```

And from Chrome, you can securely access to https://localhost.

## HTTPS from a production server

First you need to know the domain name that is pointing to your server.

You need to get a certificate (for free it is better and today possible with [Certbot](https://certbot.eff.org/)

Then edit the `config.js` file to put the certificate and the private key filename.

You can start your server with:

```
$ sudo npm start
```

# License

ISC

# Author

Jean-Louis GUENEGO