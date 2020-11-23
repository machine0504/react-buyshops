let prodUrl='http://vueshop.glbuys.com';
//生产环境下使用
let devUrl='http://vueshop.glbuys.com';
//开发模式下使用
let baseUrl=process.env.NODE_ENV==='development'?devUrl:prodUrl;
export default {
    baseUrl:baseUrl,
    path:'/',
    token:'lec949a15fb70930f'
}