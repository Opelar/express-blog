/**
 *  sign script
 *  create by xxmy
 */

const crypto = require("crypto");

const defaultCharts = "abcdefghijklmnopqrstuvwxyz0123456789";

const sign = (module.exports = {
  md5: (...args) => {
    if (!args.length) {
      return null;
    }

    let s = crypto.createHash("md5");

    args.map(i => s.update(i.toString()));

    return s.digest().toString("base64");
  },

  sha1: (...args) => {
    if (!args.length) {
      return null;
    }

    let s = crypto.createHash("sha1");

    args.map(i => s.update(i.toString()));

    return s.digest().toString("hex");
  },

  random: (max, min) => {
    min = ~~min || 0;
    max = ~~max || 0;

    if (min && max) {
      max = max - min + 1;
      return ~~(Math.random() * max) + min;
    } else if (max) {
      return ~~(Math.random() * max);
    }

    return min;
  },

  getSalt: () => {
    return sign.md5(sign.randomStr());
  },

  randomStr: len => {
    let str = "";
    len = len || 10;
    while (str.length < len) {
      str += defaultCharts[sign.random(36)];
    }

    return str;
  },

  encodePwd: (pwd, salt) => {
    if (!pwd || !salt) {
      return null;
    }

    return sign.sha1(pwd, salt);
  }
});
