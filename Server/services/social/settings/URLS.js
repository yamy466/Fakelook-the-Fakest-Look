const URLS = {
  serverPort: 4000,
  clientPort: 3000,
  authPort: 2000,
  usersPort: 5000,
  socialPort: 6000,
  postsPort: 7000,
  serverDomain: "http://localhost",
  authURL: `${this.serverDomain}:${this.authPort}`,
  usersURL: `${this.serverDomain}:${this.usersPort}`,
  socialURL: `${this.serverDomain}:${this.socialPort}`,
  postsURL: `${this.serverDomain}:${this.postsPort}`,
};

module.exports = URLS;