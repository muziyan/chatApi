const path = require("path")
const Controller = require("egg").Controller

class ToolController extends Controller{
    async updateImage() {
        const {ctx} = this;
        const file = ctx.request.files[0];
        let date = new Date().toLocaleString();
        const name = "images/" + path.basename(date + file.filename)
        let result = await ctx.oss.put(name, file.filepath,{
            mime:"text/plain"
        })
        ctx.body = {
            url:result.url
        }
    }
}

module.exports = ToolController
