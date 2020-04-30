# egg.js + egg-sequelize plugin 开发聊天室api接口

## 下载运行

>`git clone https://github.com/muziyan/chatApi.git`  
>`copy`一份`.env.exmple`为`.env`在里面配置数据库帐号密码端口数据库名称和跨域白名单  
>执行`yarn` or `npm i` 下载依赖包  
>如果`databse`下面有`config.json`请先删除在执行下列命令  
>执行`npx sequelize init:config`生成`database config.json`  
>执行`npx sequelize db:migrate`迁移数据库  
>`npx sequelize db:migrate:undo:all`回滚初始状态  
>执行`yarn dev` or `npm run dev`运行程序

> [egg.js文档](https://eggjs.org/)  
> [sequelize文档](https://sequelize.org/)

### database
#### user tables

- users tables column
```
    id: integer         // 主键 
    chat_id: integer    // 帐号id
    personality: string // 个性签名
    avatar: string      // 头像路径
    register_at: date   // 注册时间
    username: string    // 用户昵称
    password: string    // 用户密码
    sex:enum            // 用户性别 ['max','female','unknown']  默认 unknown
    birthday: date      // 用户生日 默认 注册时间
    phone: integer      // 用户手机号
    email： string      // 用户邮箱
```

- user api doc

```
    // get all data
    get("/api/users") 
    =>
    [
        {
            id,
            chat_id,
            personality,
            avatar,
            register_at,
            username,
            password,
            sex,
            birthday,
            phone,
            email
        }
        ...
    ]

    // show one data
    get("/api/users/:id")
    =>
    {
        id,
        chat_id,
        personality,
        avatar,
        register_at,
        username,
        password,
        sex,
        birthday,
        phone,
        email
    }

    // create data
    data = {
       	"username":"season33333222",
	    "password":"season222",
    	"email":"1123123@qq.com",
	    "chat_id":12312 
    }
    post("/api/users",data)
    => 
    {
        user_id
    }
    return status 201


    // update data
    data = {
        personality,
        avatar,
        register_at,
        username,
        password,
        sex,
        birthday,
        phone,
        email
    }
    // data 中的字段可以任意选择数据修改，也可以全部修改
    put("/api/users/:id",data) return status 204

    // delete data
    delete("/api/users/:id") return status 200

    // check email and check chat_id
    get("/api/users/checkEmail/:email")
    get("/api/users/checkChatId/:chat_id") 
    with data return 422 Return 422 if there is data, otherwise return 200
```

### auth api

``` 
    register api
    post("/api/register")


    login api
    data={
        chat_id,
        password
    }
    post("/api/login",data)
    chat_id err return status 404 and message
    password err return status 422 and message
    login success return Bearer token
    token use function
    request header add Authorization : token 
    E.g:
    headers = {
        Authorization : token
    }
```
