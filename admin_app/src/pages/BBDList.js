import React,{useState,useEffect} from 'react';
import '../static/css/BBDList.css'
import {List,Icon, Card,Input, Modal ,message ,Button, Drawer,} from 'antd';

import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import ClearableLabeledInput from 'antd/lib/input/ClearableLabeledInput';
const { confirm } = Modal;
const { TextArea } = Input;





function ArticleList(props){

    const [list,setList]=useState([])
    const [visible,setVisible] = useState(false)
    const [title,setTtitle] = useState('')
    const [videoUrl,setVideoUrl] = useState('')
    const [imageUrl,setImageUrl] = useState('')

    //修改标题
    const changeTitle = (e)=>{
        setTtitle(e.target.value)
    }

    //修改视频地址
    const changeVideoUrl = (e)=>{
        setVideoUrl(e.target.value)
    }
    //修改图片地址
    const changeImageUrl = (e)=>{
        setImageUrl(e.target.value)
    }

    //清除文本框值的方法
    const clearAll = ()=>{
        setTtitle('')
        setVideoUrl('')
        setImageUrl('')
    }

    //增加视频方法
    const saveBBD = ()=>{
      
        if(!title){
            message.error('视频标题不能为空')
            return false
        }else if(!videoUrl){
            message.error('视频地址不能为空')
            return false
        }else if(!imageUrl){
            message.error('图片地址不能为空')
            return false
        }

        let dataProps = {}
        dataProps.title = title
        dataProps.url = videoUrl
        dataProps.image = imageUrl
        dataProps.order_id = 0
        axios({
            method:'post',
            url:servicePath.addBBD,
            data:dataProps,
            withCredentials: true
        }).then(
           res=>{
           
            if(res.data.isScuccess){
                message.success('视频添加成功')
                clearAll()
                getList()
            }else{
                message.error('文章添加失败');
            }
           
           }
        )
    }

    const delBBDAction = (id)=>{
        console.log(id)
        confirm({
            title: '确定要删除这个视频吗?',
            content: '如果你点击OK按钮，视频将永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delBBDbyId+id,{ withCredentials: true}).then(
                    res=>{
                      
                        message.success('文章删除成功')
                        getList()
                     }
                 )
            },
            onCancel() {
                message.success('没有任何改变')
            },
          });


    }

   

    //读取视频列表
    const getList = ()=>{
        
        axios({
            method:'get',
            url:servicePath.getListBBD,
            withCredentials: true
        }).then(
           res=>{
            console.log(res.data.list)
            setList(res.data.list)   
           }
        )

    }


    //打开抽屉
    const showDrawer = ()=>{
        setVisible(true) 
    }

    //关闭抽屉
    const onClose = ()=>{
        setVisible(false)
    }

    useEffect(()=>{
        getList()
    },[])
    
  
 


    return (
        <div>
             <div style={{ marginBottom: 16 }}>
                 <Button type="primary" onClick={showDrawer}>添加新视频</Button>
                 <Drawer 
                    title="Add New Video"
                    plaement="right"
                    closable='false'
                    width={400}
                    onClose={onClose}
                    visible={visible}
                 >
                 <div>
                     <div style={{ marginBottom: 16 }}>
                         <Input 
                            size="large" 
                            value={title}
                            onChange={changeTitle}  
                            placeholder="视频标题" />    
                     </div>
                     <div style={{ marginBottom: 16 }}>
                         <Input 
                            size="large" 
                            value={videoUrl} 
                            onChange={changeVideoUrl}  
                            placeholder="视频地址" />    
                     </div>
                     <div style={{ marginBottom: 16 }}>
                         <TextArea 
                            rows={3}  
                            value={imageUrl} 
                            onChange={changeImageUrl}   
                            placeholder="图片地址" />  
                     </div>
                     <div style={{ marginBottom: 16 }}>
                         <img src={imageUrl} width="100%" />
                     </div>
                     <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={saveBBD} block>确认完成 </Button>
   
                     </div>



                 </div>

                 </Drawer>
             </div>

             <div>

                <List
                    dataSource={list}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 5,
                        xl: 6,
                        xxl: 6,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <Card 
                                title={item.title} 
                                bordered={true} 
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="delete" key="edit" onClick={()=>{
                                        delBBDAction(item.id)
                                    }} />,
                                    
                                 ]}
                                 cover={
                                    <img
                                      alt="example"
                                      src={item.image}
                                    />
                                }
                               >
                            <div className="cart-list-url">
                               <a href={item.url} target="_blank">{item.url}</a> 
                            </div>
                             
                            </Card>
                        </List.Item>
                    )}
                />

               
                

             </div>
             
        </div>
    )
  
}

export default ArticleList