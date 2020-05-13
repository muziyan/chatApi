module.exports = ()=>{
    return async (ctx,next) =>{

        const { app, socket,logger} = ctx;
        const nsp = app.io.of("/")
        console.log("a user connect")
        console.log(ctx.socket.id)

        await next();

        console.log(ctx.socket.id)
        console.log("a user disconnect")

    }
}
