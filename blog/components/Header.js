import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/header.css'
import {Row,Col, Menu, Icon} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const Header = () => {
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
           const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    
                    return res.data.data
                }
              )
           setNavArray(result)
        }
        fetchData()
    },[])
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.replace('/index')
        }else{
           // Router.replace('/list?id='+e.key)

            Router.push({
                pathname: '/list',
                query: { id: e.key }
              })
        }
    }
    return (
       
            <div className="header">
                <div className="header-center">
                    <Row type="flex" justify="center">
                        <Col  xs={24} sm={24} md={13} >
                            <span className="header-logo">
                                <Link href={{pathname:'/index'}}>
                                    <a> 技术胖</a>
                                </Link>
                            
                            </span>
                            <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                        </Col>
                    
                        <Col className="memu-div" xs={0} sm={0} md={11} >
                            <Menu  
                            mode="horizontal"
                            onClick={handleClick}
                            >
                                <Menu.Item key="0">
                                    <Icon type="home" />
                                    博客首页
                                </Menu.Item>
                                {
                                navArray.map((item)=>{
                                    return(
                                        <Menu.Item key={item.Id}>
                                            <Icon type={item.icon} />
                                            {item.typeName}
                                        </Menu.Item>
                                    )
                                }) 
                                }
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </div>
       
    )
}

export default Header
