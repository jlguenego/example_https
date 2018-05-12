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

## HTTPS from a production server (Google Compute Engine)

### Prerequisites

#### Shell Access required

We need to deploy the project on a machine with a shell access.

#### Create a GCE instance (Google Compute Engine)

This example of production deployment is done an VM instance on the Google cloud (called Google Compute Engine).

You need to create an account on Google Cloud to do that (need a credit card that will not be charged, it is the Google policy).

On the google cloud platform console, go to "Compute Engine" menu and create a new instance.

When you choose your VM please choose a **Debian 9 Linux distribution** with the smallest hard drive (10G) and the smallest machine to spare your credit.

**Important:** Do not forget to let the **firewall access** the HTTP and HTTPS connection (port 80 and 443)

Please note the new IP address for your newly instance created *x.y.z.t*.

#### DNS config

Updapte the DNS of your domain name provider (OVH, Amazon, Google, etc.) in order to add a redirection to the external IP address of this new VM instance.

Personnaly I like to use my website *jlg-consulting.com* that is currently hosted by OVH.

So I connect to the OVH manager, select my domain *jlg-consulting.com* and add the DNS rule (type A for IP redirection) for the *foobar* subdomain:
foobar.jlg-consulting.com points to the GCE VM instance IP address *x.y.z.t*.

#### Install

Open a shell on the VM instance.

Install git, node and clone this project.
Then start the server with the npm module *forever*.

Git:

```
$ sudo apt-get install -y git
```

NodeJS:
```
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Clone the project:
```
$ git clone https://github.com/jlguenego/example_https.git
$ cd example_https
$ npm i
$ sudo npm i -g forever
```

Start the HTTP server.
```
$ sudo forever start server.js
```

#### Test HTTP

Go to Chrome and test the http://x.y.z.t url.

Then test the domain url (With my example it is http://foobar.jlg-consulting.com)


#### Get the HTTPS certificate for free

Thanks to https://letsencrypt.org/ we can get a HTTPS certificate for free. It is a Certificate Authority founded by ISRG and sponsored by the Facebook, OVH, Cisco, DigitalOcean, Github, etc. to secure the web.

Thanks to https://github.com/certbot/certbot for allowing us to get easily a HTTPS ready certificate.

Now we do the job:

```
$ sudo apt-get install certbot -t stretch-backports
$ sudo certbot certonly
```



You need to know the domain name that is pointing to your server and have the DNS already setup.

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