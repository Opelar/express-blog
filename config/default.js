module.exports = {
  port: 3000,
  db_name: "learn",
  url: "mongodb://localhost:27017/learn",
  session: {
    name: "SID",
    secret: "SID",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
};
