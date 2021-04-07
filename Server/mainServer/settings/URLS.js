const serverDomain = "http://localhost";
const PORTS = {
  mainServerPort: 4000,
  clientPort: 3000,
  authPort: 2000,
  usersPort: 5000,
  socialPort: 6000,
  postsPort: 7000,
};

const URLS = {
  authURL: `${serverDomain}:${PORTS.authPort}`,
  usersURL: `${serverDomain}:${PORTS.usersPort}`,
  socialURL: `${serverDomain}:${PORTS.socialPort}`,
  postsURL: `${serverDomain}:${PORTS.postsPort}`,
  mainServerURL: `${serverDomain}:${PORTS.mainServerPort}`
};

module.exports = { URLS, PORTS };
