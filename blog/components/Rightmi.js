import {Icon, Tabs,Alert,Button} from 'antd'
import '../static/style/components/rightmi.css'
const { TabPane } = Tabs;

const Rightmi =(props)=>{

   const goArticle=()=>{
        window.location.href="https://jspang.com/detailed?id=54"   
   }

    return (
        <div className="comm-box rightmi-div">
            <Tabs defaultActiveKey="1" >
                <TabPane tab="密圈" key="1">
                    <div className="miquan-img">
                            <img src="http://newimg.jspang.com/zhishixingqiu.png" />
                    </div>
                    <div className="miquan-price">
                     <Icon type="money-collect" /> 只要50元/年  得4项福利
                    </div>

                    <div className='miquan-text'>
                        <p><Icon type="check-circle" theme="twoTone" twoToneColor="#1890ff" /> 视频离线高清版下载-400集</p>
                        <p><Icon type="check-circle" theme="twoTone" twoToneColor="#1890ff" /> 每周至少两篇文章分享</p>
                        <p><Icon type="check-circle" theme="twoTone" twoToneColor="#1890ff" /> 技术胖收费视频半价购买</p>
                        <p><Icon type="check-circle" theme="twoTone" twoToneColor="#1890ff" /> 每天回答所提问题（选择性回答）</p>
                        
                    </div>
                    <div className="quan-button">
                         <Button type="primary" onClick={goArticle}>查看详情</Button>
                    </div>
                </TabPane>

                <TabPane tab="公号" key="2">
                    <div className="miquan-price">
                        <div className="miquan-img">
                            <img src="http://newimg.jspang.com/weixingongzhonghao.jpg" />
                        </div>
                    
                        
                    </div>
                </TabPane>
                
                <TabPane tab="QQ群" key="3">
                    <div className="miquan-price">
                      加入QQ群  一起学习
                    </div>
                    <div className='miquan-text'>
                        <p>
                            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=2a2a0b16daf3585d48deac1e319c882267c96cba8ece83935747abe544d80c0d"> 
                                <Icon type="qq"  /> <span>前端1群:364140450（3000人）</span>
                            </a>
                        </p>
                        <p>
                            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=1559d080cc0db285cdc83ab5b1c204b7f6b45d0400544aa91eeebba7fbc18dc"> 
                                <Icon type="qq"  /> <span>前端2群:524520566（2000人）</span>
                            </a>
                        </p>
                        <p>
                            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=aafa8c3f07154301b623bf4e409bb8ef8794d4c6510a3e78bd371fd8056e6af7"> 
                                <Icon type="qq"  /> <span>React群:159579268（2000人）</span>
                            </a>
                        </p>
                        <p>
                            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=0b7483ae6580a17d1f8bc94fe51a8ea33f7a5c212448e9b9f197079891dbe3cc"> 
                                <Icon type="qq"  /> <span>Flutter-1群:674639629（3000人）</span>
                            </a>
                        </p>
                        <p>
                            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=f3acaeedea2a2219f0541a6ec589e3ff6e500036ce994d055acca783b8bc1509"> 
                                <Icon type="qq"  /> <span>Flutter-2群:806799257（2000人）</span>
                            </a>
                        </p>
                            
                    </div>
                </TabPane>
              
               
            </Tabs>
        </div>
    )

}

export default Rightmi