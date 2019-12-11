let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  添加文章
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    checkOpenId:ipUrl + 'checkOpenId' ,  //  检查OPendId是否和服务器一样
    outLogin:ipUrl + 'outLogin' ,  //  退出登录
    addBBD:ipUrl + 'addBBD' ,  //  增加大胖逼逼叨视频
    getListBBD:ipUrl + 'getListBBD' ,  //  大胖逼逼叨列表
    delBBDbyId:ipUrl + 'delBBDbyId/' ,  //  删除大胖逼逼叨单一项
    updateIsTop:ipUrl + 'updateIsTop' ,  //  修改文章是否置顶
}

export default servicePath;