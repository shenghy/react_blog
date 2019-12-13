import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb ,BackTop ,Skeleton } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Rightmi from '../components/Rightmi'
import '../static/style/pages/detailed.css'

import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'





const Detailed = (props) =>{

  let articleContent=props.article_content
  if(articleContent=='id错误'){
    console.log('渲染完成，但什么都没有')
    
    return false
  }

  useEffect( ()=>{

    setTimeout(()=>{
      myFuction()
    },100)
     
   
    

   

  },[])

  const [html,setHtml] = useState(props.article_content_html)
  const [tocify,setTocify] = useState(new Tocify())
  const [loading,setLoading] = useState(true)
 

  const myFuction = async ()=>{

      let newhtml =await marked(props.article_content)
      //setHtml(newhtml)
      setLoading(false)
      //console.log(tocify.render())
      
  }
    
    
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
   
  marked.setOptions({
 
    renderer: renderer,
    
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 

  


  return (
    <>
      <Head>
        <title>技术胖-{props.title}</title>
        <meta name="description" content={props.title}></meta>
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" / >
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}   >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.title}
                </div>
            
                <div className="list-icon center">
                  <span><Icon type="calendar" /> {props.addTime}</span>
                  <span><Icon type="folder" /> {props.typeName}</span>
                  <span><Icon type="fire" /> {props.view_count}</span>
                </div>
                <div className="detailed-content"  dangerouslySetInnerHTML = {{__html:props.introduce_html}}  >
                   
                </div>
                
                  <div className="detailed-content"  
                    dangerouslySetInnerHTML = {{__html:html}}   >
                  

                  </div>
               

             </div>
                
            </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
          <Advert />
          <Rightmi/>
        
            <div>
              
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <Skeleton loading={loading} active paragraph={{ rows: 6 }} >
                <div className="toc-list">
                {tocify && tocify.render()}
                </div>
                </Skeleton>
              </div>

             
            </div>
         
          
        </Col>
      </Row>
      <Footer/>
      <BackTop />
     
    
   </>
  )
  //{tocify && tocify.render()}

} 

Detailed.getInitialProps = async(context)=>{
  let date=new Date();

 
  let month=date.getMonth();
  let day=date.getDate();

  let  hour=date.getHours();
  let minute=date.getMinutes();
  let second=date.getSeconds();
  let time=month+'/'+day+'/'+hour+':'+minute+':'+second
  
  
  console.log('----->'+time+':Visit the details page,parameter='+context.query.id)
  //把ID强制转换成数字

  let id =parseInt(context.query.id)
 
 
    const promise = new Promise((resolve)=>{
      if(id){
        axios(servicePath.getArticleById+id).then(
          (res)=>{
            // console.log(title)
            if(res.data.data=='id错误'){
              console.log('ERROR.......')
              resolve({article_content:'id ERROR'})
            }else{
              resolve(res.data.data[0])
            }
            
          }
        )
      }else{
        console.log('error......')
        resolve({article_content:'Id Error'})
      
      }

    })
    return await promise
 
 

  
}

export default Detailed
