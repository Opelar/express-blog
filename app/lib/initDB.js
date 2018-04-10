const dbAdap = require("./dbAdap");
const config = require("../../config/default");

// 服务初始化函数
function initDB() {
  // db connect init & http server init
  dbAdap.init({ mongodb: config.url, db_name: config.db_name });

  dbAdap.on("db_connect", () => {
    console.log("mongodb connected.");

    // http server init
    // var server = app.listen(3000, () => {
    //   var host = server.address().address;
    //   var port = server.address().port;
    //   console.log("App listening at http://%s:%s", host, port);
    // });
  });

  dbAdap.on("error", err => {
    console.log("db connect error, %s", err && err.stack);
    console.log("try start in 3s ......");

    setTimeout(
      dbAdap.init.bind(this, {
        mongodb: config.url
      }),
      3 * 1000
    );
  });
}

module.exports = initDB;
