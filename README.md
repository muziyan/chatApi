# egg.js + egg-sequelize plugin 开发聊天室api接口

## 下载运行

>`git clone https://github.com/muziyan/chatApi.git`  
>`copy`一份`.env.exmple`为`.env`在里面配置数据库帐号密码端口数据库名称和跨域白名单  
>执行`yarn` or `npm i` 下载依赖包  
>如果`databse`下面有`config.json`就不需要执行生成`config.json`命令  
>执行`npx sequelize init:config`生成`database config.json`  
> `config.json`里面需要迁移的数据库配置，需要修改成你自己的配置
>执行`npx sequelize db:migrate`迁移数据库  
>`npx sequelize db:migrate:undo:all`回滚数据库初始状态  
>执行`yarn dev` or `npm run dev`运行程序

> [egg.js文档](https://eggjs.org/)  
> [sequelize文档](https://sequelize.org/)


* [database](###database)
    - [usertable](####userstablescolumn)
* [api doc](###apiDoc)



### database

#### users tables column
> 用户信息表

```
    id: integer primarkey autoIncrement       // 主键 自增
    chat_id: integer        // 帐号id
    personality: string     // 个性签名
    avatar: string          // 头像路径
    register_at: date       // 注册时间
    username: string        // 用户昵称
    password: string        // 用户密码
    sex:enum                // 用户性别 ['max','female','unknown']  默认 unknown
    birthday: date          // 用户生日 默认 注册时间
    phone: integer          // 用户手机号
    email： string          // 用户邮箱
```

- user message table column
> 好友消息表

```
    id: integer primarkey autoIncrement     // 主键 自增
    from_id: integer        // 发送消息用户的id
    to_id: integer          // 接受消息用户的id
    msg: string             // 消息数据
    msg_type: enum          // 消息类型 ['txt','img','voice'] 默认 txt
    from_date: date         // 消息时间
```

- user request table column
> 好友申请表

```
    id: integer primarkey autoIncrement     // 主键 自增
    from_id: integer        // 发送好友申请用户id
    to_id: integer          // 接受好友申请用户id
    verify_data: string     // 申请信息
    from_date: date         // 申请时间
    status: enum            // 申请状态 ['wait','agree','refuse'] 默认wait
```

- group table column
> 群组表

```
    id: integer primarkey autoIncrement     // 主键 自增
    group_name: string      // 群组名称
    group_avatar: string    // 群组头像地址
    group_desc: string      // 群组描述
    group_placard: string   // 群组公告
```

- group messages table column 
> 群组消息表

```
    id: integer primarkey autoIncrement     // 主键 自增
    group_id: integer       // 群组id
    user_id: integer        // 用户id
    msg: string             // 消息数据
    msg_type: enum          // 消息类型 ['txt','img','voice'] 默认 txt
    from_date: date         // 消息时间
```

- group user table column
> 群组成员表

```
    id: integer primarkey autoIncrement     // 主键 自增
    group_id: integer       // 群组id
    user_id: integer        // 用户id
    identity: enum          // 群组中用户身份   ['lord','admin','user'] 默认 user
```

### apiDoc

- auth
> login and register and checkEmali and checkChatId four three api No token verification required

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

    get user api
    需要在请求头添加token,才能获取到数据
    get("/api/getUser")
```

- user
> 用户接口

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

- user-message
> 好友消息表接口

```
    // get all user message data and from user information
    get('/api/user-message')
    =>
    [
        {
            id,
            from_id,
            from_user:{
                // Related user information
            },
            to_id,
            to_user:{
                // Related user information
            },
            msg,
            msg_type,
            from_date
        }
        ...
    ]


    // get one-to-one user message data and user infomation
    get("/api/user-message/:from_id/:to_id")
    =>
    {
        {
            id,
            from_id,
            from_user:{
                // Related user information
            },
            to_id,
            to_user:{
                // Related user information
            },
            msg,
            msg_type,
            from_date
        }
        ...
    }

    // add user message data
    data = {
        from_id,
        to_id,
        msg,
        msg_type // The message type is text by default. If it is text, you can not add this field.
    }
    post("/api/user-message",data)
    =>
    {
        user_message_id
    }
```

- user-requests
> 好友请求接口

```
    // get all friend requests
    get("/api/user-requests")
    =>
    {
        from_id,
        from_user:{
            user data
        },
        to_id,
        to_user:{
            user data
        },
        verify_data,
        from_date,
        status
    }

    // get all friends 
    // Need to upload the current user id
    get("/api/user-requests/user_id")
    => 
    [
        {
            user data
        }
        ...
    ]

    // send firend application
    data = {
        from_id,
        to_id,
        verify_data
    }
    post("/api/user-requests",data)
    => 
    {
        user-requests-id
    }

    // Process friend application
    data = {
        status: 'agree' or 'refuse'
    }
    put("/api/user-requests/id",data)
```