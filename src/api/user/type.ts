// 登录接口数据

export interface loginFromData{
    username:string,
    password:string
}

export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface loginResponseData extends ResponseData{
    data:string
}

export interface userInfoResponseData extends ResponseData{
    data:{
        routers:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string,
    }
}