const jwt = require('jsonwebtoken')

module.exports = options =>{
  return async function auth(ctx,next){
    if (ctx.header.authorization){
      const userAgent = ctx.header["user-agent"]
      const token = ctx.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token,userAgent)
      ctx.session.userId = decoded;
      ctx.session.user = await ctx.service.userService.show(decoded);
      await next();
    }else{
      ctx.status = 401;
      ctx.body = {
        message:"Authorization not found!"
      }
    }
  }
}
