import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , List , Card,Breadcrumb  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/bibidao.css'

import axios from 'axios'
import  servicePath  from '../config/apiUrl'


const Bibidao = (data) =>{

  const [mylist, setList ] = useState(data.list)
 

 useEffect(()=>{
 
 })

  return (
    <>
      <Head>
        <title>大胖逼逼叨</title>
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" / >
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>大胖逼逼叨</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>

               <List
                    dataSource={mylist}
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 4,
                        md: 4,
                        lg:4,
                       
                    }}
                    renderItem={item => (
                        <List.Item>
                            <Card  
                              hoverable 
                              bordered={true}  
                            >
                              <div className="item-div">
                                  <a href={item.url} target="_blank" className="img-wrapper">
                                    <img alt="example"  className="bbd-img" src={item.image}  />
                                  </a>
                              </div>
                              <div className="bbd-title">
                                <a href={item.url} target="_blank">
                                  <span className="bbd-zi">{item.title} </span> 
                                </a>
                              </div>
                           
                             
                            </Card>
                        </List.Item>
                    )}
                />

              </div>

                
            </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
         
        </Col>
      </Row>
      <Footer/>
  
   </>
  )

} 

Bibidao.getInitialProps = async (context)=>{


  const promise = new Promise((resolve)=>{
   
      axios(servicePath.getListBBD).then(
        
          (res)=>{
            
            return resolve(res.data)
          }
        )
      
    })

  
  return await promise
}

export default Bibidao
