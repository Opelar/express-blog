/**
 * 定义系统中所用到的全部状态信息
 *
 * @author wangsu@xmanlegal.com
 * 
 */
module.exports = {
  "-1": {
    typeString: "Unknown Error",
    httpStatus: 500,
    httpMessage: "Internal Error"
  },
  //用于表示调用成功, 如果没有具体内容需要返回, 直接返回字符串 ok
  "0": {
    typeString: "OK",
    httpStatus: 200,
    defaultMessage: "ok",
    httpMessage: "ok"
  },
  //表示部份成功, 如整组ID查询,但只有部份结果存在的情况. 非严格条件下, 也可以使用 0 <OK>.
  "1": {
    typeString: "Part OK"
  },
  //发生系统执行环境错误, 但原因未知.
  "1000": {
    typeString: "System Error",
    httpStatus: 500,
    httpMessage: "Internal Service Error"
  },
  //网络异常, 如无法启动监听端口等
  "1100": {
    typeString: "Network Error"
  },
  //磁盘或文件系统导至的异常.
  "1200": {
    typeString: "File System Error"
  },
  //磁盘满, 无法写入新内容.
  "1201": {
    typeString: "Disk Full"
  },
  //配置文件错误
  "1300": {
    typeString: "Configure Error"
  },
  //配置文件丢失
  "1301": {
    typeString: "Configure Missing"
  },
  //配置文件存在, 但不能正常解析
  "1302": {
    typeString: "Configure Parse Error"
  },
  //依赖内容丢失
  "1400": {
    typeString: "Missing Depend"
  },
  //基础库丢失
  "1401": {
    typeString: "Missing Common Library"
  },
  //基础库调用失败
  "1402": {
    typeString: "Common Library Error"
  },
  //引用内容丢失
  "1410": {
    typeString: "Missing Include"
  },
  //引用内容失败
  "1411": {
    typeString: "Include Error"
  },
  //依赖服务错误
  "2000": {
    typeString: "Remote Service Error",
    httpStatus: 500,
    httpMessage: "Internal Service Error"
  },
  // 远端服务访问超时
  "2001": {
    typeString: "Remote Service Timeout"
  },
  //数据库错误
  "2100": {
    typeString: "DB Error"
  },
  //缓存服务错误
  "2200": {
    typeString: "Cache Error"
  },
  //队列服务错误
  "2300": {
    typeString: "Queue Error"
  },
  //队列服务满
  "2301": {
    typeString: "Queue Full"
  },
  //运行时错误
  "3000": {
    typeString: "Runtime Error",
    httpStatusS: 500
  },
  // 运行时错误,但找不到对应错误类型.
  "3001": {
    typeString: "Undefined Error"
  },
  //数据错误
  "3100": {
    typeString: "Data Error"
  },
  //违反完整性约束, 无法完成数据操作. (一般用于删除)
  "3101": {
    typeString: "Integrity Constraints Fail"
  },
  //违反唯性性约束, 无法完成数据操作. (一般用于插入或变更)
  "3102": {
    typeString: "Unique Constraints Fail"
  },
  //缺少指定的依赖,无法完成数据操作. 这里需要说明的是,3110不应表示参数缺失, 而是依赖目标未找到, 如指定用户ID,但没有找到对应用户.(一般用于插入或变更,)
  "3110": {
    typeString: "Require Part Missing"
  },
  //目标不存在, 区别于3110的状态, 3111表示直接指定的访问目标, 如ID查询等操作.
  "3111": {
    typeString: "Target Missing",
    httpStatus: 400
  },
  //接口调用失败
  "3200": {
    typeString: "Call Error"
  },
  //功能离线. 表示当前服务被关闭, 而这种状态是正常的, 调用者可直接忽略该错误继续其它操作. 用于辅助系统的临时关闭或调整, 如通知服务.
  "3201": {
    typeString: "Feature Close",
    httpStatus: 502
  },
  //服务忙, 稍后重试.调用者可以延后一定时间再进行重试或尝试其它服务节点.具体等待时间可由配置文件或接口返回.
  "3210": {
    typeString: "Busy Retry Later"
  },
  //服务忙, 请尝试其它服务结点. 调用者应直接尝试其它服务结点,并且在一定时间内不应再调用该节点. 具体空置时间可以由配置文件或接口返回.
  "3211": {
    typeString: "Busy Retry Other",
    httpStatus: 502
  },
  //接口服务关闭.
  "3300": {
    typeString: "Interface Down"
  },
  //接口已经关闭. 被其它接口替换, 如果可能, 可应答新的替代接口.
  "3301": {
    typeString: "Replace Down",
    httpStatus: 501
  },
  //用户错误
  "4000": {
    typeString: "User Error",
    httpStatus: 400
  },
  //重复请求.
  "4001": {
    typeString: "Double Request"
  },
  //注册失败
  "4010": {
    typeString: "Register Fail"
  },
  //注册失败, 用户已存在
  "4011": {
    typeString: "User Exists"
  },
  "4012": {
    typeString: "User Not Exists"
  },
  //认证失败, 用户未认证或认证超时
  "4100": {
    typeString: "Access Denied",
    httpStatus: 401
  },
  //无法通过认证, 用户不存在
  "4101": {
    typeString: "Login Deny"
  },
  // 无法通过认证, 密码不正确
  // "4102": {
  //     typeString: "Login Deny"
  // },
  //无法通过认证, 请重新登陆. (用于密码被修改或类似动作,要求用户重新登陆)
  "4103": {
    typeString: "Retry login"
  },
  //无法通过认证, 密码过期过存在安全问题, 请修改密码
  "4104": {
    typeString: "Reset Pwd"
  },
  //访问被阻止.
  "4200": {
    typeString: "Access Limit",
    httpStatus: 403
  },
  //用户位于黑名单规则上, 不能提供访问.
  "4201": {
    typeString: "Blocked User"
  },
  //用户访问过快, 临时限制.
  "4206": {
    typeString: "Speed Limit"
  },
  //记录为非正常访问, 由于被识别成扫描工具,批处理脚本, 伪造请求等非正常用户访问而不被允许, 同时被记录用于安全分析.
  "4207": {
    typeString: "Fake Request Record"
  },
  //参数错误
  "4300": {
    typeString: "Params Error"
  },
  //请求过大, 数据体超过合理限制.
  "4301": {
    typeString: "Too Large"
  },
  //丢失必要参数.
  "4302": {
    typeString: "Missing Required"
  },
  //已提供参数中有格式错误.
  "4303": {
    typeString: "Invalid Format"
  },
  //错误的ID格式, 将ID单独列出是用于该类接口目的较为明确,且无其它查询条件, 并且在批量的ID查询中, 任意一个错误,即需要认为整体错误.
  "4304": {
    typeString: "Invalid Id"
  },
  // 用户文件操作失败
  "4400": {
    typeString: "File Operations Fail"
  },
  //上传文件过大.
  "4410": {
    typeString: "File Too Large"
  },
  //上传文件过多.
  "4411": {
    typeString: "File Too Many"
  },
  //非限制格式的文件.
  "4412": {
    typeString: "Unacceptable File Format"
  },
  //文件格式与声明格式不符, 如扩展名为.dox但实际不是的情况, 目前系统中仅用于解压word文件并提供预览时.
  "4414": {
    typeString: "invalid File Format"
  },
  // 接口需要上传文件, 但文件不存在或少于必须的数量.
  "4415": {
    typeString: "File Missing"
  },
  // 文件或目录名称不正确
  "4417": {
    typeString: "Invalid File Name"
  },
  //浏览器端错误.
  "5000": {
    typeString: "Browser Error"
  },
  "6000": {
    typeString: "Record Expired"
  },
  "6001": {
    typeString: "Record Not Existed"
  },
  "6002": {
    typeString: "Record Existed"
  }
};
