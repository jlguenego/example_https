const domain = 'gce.jlg-consulting.com';

module.exports = {
	httpOnly: true,
	privateKeyFilename: `/etc/letsencrypt/live/${domain}/privkey.pem`,
	certificateFilename: `/etc/letsencrypt/live/${domain}/fullchain.pem`,
};
