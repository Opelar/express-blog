const sign = require('../lib/sign');
const dbAdap = require('../lib/dbAdap');
const adminUser = require('../lib/adminUser');

exports.registerAdmin = async () => {
  const User = await dbAdap.getCollection('user');
  const isExist = await User.count({
    $or: [{ username: adminUser.username }]
  });

  if (isExist) return;

  let u = {};
  u.id = dbAdap.newIdString();
  u.username = adminUser.username;
  u.salt = sign.getSalt();
  u.pwdhash = sign.encodePwd(adminUser.password, u.salt);
  u.ctime = u.utime = Date.now();
  
  User.insertOne(u);
}