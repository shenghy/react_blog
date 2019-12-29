'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        //首页的文章列表数据
        
        this.ctx.body='hi api'
    }

    //首页文章列表接口
    async getArticleList(){

       let sql = 'SELECT article.id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                 'article.view_count as view_count ,'+
                 'article.introduce_html as introduce_html ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                 'WHERE article.isTop = 0  AND article.type_id <> 99 '+
                 'ORDER BY article.id DESC'
        //console.log(sql)
        const resList = await this.app.mysql.query(sql)
        const resType = await this.app.mysql.select('type')
        //大胖逼逼叨列表
        const bibidaoList = await this.app.mysql.select('bibidao',{
            orders:[['id','desc']],
            limit:4
        })
        //置顶文章
        let sql2 = 'SELECT article.id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                 'article.view_count as view_count ,'+
                 'article.introduce_html as introduce_html ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                 'WHERE article.isTop = 1 '+
                 'ORDER BY article.id DESC'
        const resTopList = await this.app.mysql.query(sql2)
        this.ctx.body={
            list:resList,
            type:resType,
            bibidaoList:bibidaoList,
            topList:resTopList

        }

    }
    //得到详细页文章接口
    async getArticleById(){
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id

        if(id){
            let sql1 = "UPDATE article SET view_count = (view_Count+1) WHERE id ="+id 
       
            let updateResult=await this.app.mysql.query(sql1)
            const updateSuccess = updateResult.affectedRows === 1
            if(updateSuccess){
                let sql2 = 'SELECT Id,type_id,title,article_content,'+
                'introduce,view_count,part_count,article_content_html ,introduce_html,'+
                "FROM_UNIXTIME(addTime,'%Y-%m-%d' ) as addTime"+
                ' FROM article WHERE id='+id
        
                let  result2 = await this.app.mysql.query(sql2)
                result2=JSON.stringify(result2)
                result2=JSON.parse(result2)
                
                let typeid = result2[0].type_id
        
        
                let sql3 = 'SELECT typeName FROM type WHERE id='+typeid
                let result3 = await this.app.mysql.query(sql3)
        
                //console.log(result3)
                result3=JSON.stringify(result3)
                result3=JSON.parse(result3)
              
                result2[0].typeName=result3[0].typeName
        
               
                this.ctx.body={data:result2}
      
            }else{
                console.log('id错误1')
                this.ctx.body={data:'id错误'} 
            }
  
         
        }else{
            console.log('id错误2')
            this.ctx.body={data:'id错误'}
        }

       

    }

    //得到类别名称和编号
    async getTypeInfo(){

        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}

    }

    //根据类别ID获得文章列表
    async getListById(){
        let id = parseInt(this.ctx.params.id)
        if(id){
            let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'WHERE type_id='+id
            const result = await this.app.mysql.query(sql)
            this.ctx.body={data:result}
        }else{
            this.ctx.body={data:'错误的Id'}
        }
        

    }

    //获取总集数和总浏览数
    async getAllPartCount(){

        let sql = 'SELECT SUM(part_count) as all_part_count ,'+
        'SUM(view_count) as all_view_count '+
        'FROM article'
        
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
     //读取大胖逼逼叨的列表
     async getListBBD(){
        const resList = await this.app.mysql.select('bibidao',{
            orders:[['id','desc']]
        })
        
        this.ctx.body={list:resList}
     }

    


   
}

module.exports = HomeController