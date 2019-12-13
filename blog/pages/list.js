import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb ,Spin  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'

import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const ArticleList = (list) =>{

  const [ mylist , setMylist ] = useState(list.data);
  const [ loading,setLoading] =useState(false)

  const goLoading= ()=>{

    setLoading(true)
  }


  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 

 useEffect(()=>{
  setMylist(list.data)
 })

  return (
    <>
      <Head>
        <title>列表| 技术胖-胜洪宇关注web前端技术-前端免费视频第一博客</title>
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" / >
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <Spin spinning={loading}>
                      <div className="list-title" onClick={goLoading}>
                        <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                        <span><Icon type="calendar" />{item.addTime}</span>
                        <span><Icon type="folder" /> {item.typeName}</span>
                        <span><Icon type="fire" />  {item.view_count}人</span>
                      </div>
                      <div className="list-context"
                          dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                      ></div> 
                      <div className="list-go">
                            <Icon type="file" /> &nbsp;
                            <span  onClick={goLoading}>
                              <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                查看全文 
                              </Link>
                            </span>
                        </div> 
                     </Spin>
                  </List.Item>
                )}
              />  
                
            </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>
  
   </>
  )

} 

ArticleList.getInitialProps = async (context)=>{

  let id =parseInt(context.query.id)
  const promise = new Promise((resolve)=>{
    if(id){
      axios(servicePath.getListById+id).then(
          (res)=>resolve(res.data)
        )
      
    } else {
      console.log('error.....')
      resolve({article_content:'Id Error'})
    }
  })
  return await promise
}

export default ArticleList
