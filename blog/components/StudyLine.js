import '../static/style/components/studyLine.css'
import {Row,Col,Icon} from 'antd'

 const StudyLine = ()=>{
    return (
        <div className=" comm-box">
          <div className="ls-main-title">学习路线</div>
          <a href="https://jspang.com/detailed?id=56" target="_blank">
            <Row className="sl-row">
                <Col span={14} className="sl-title"><Icon type="book"/> React学习路线</Col>
                <Col span={8} className="sl-title1">基础到实战</Col>
                <Col span={2}  className="sl-icon"><Icon type="right" /></Col>
            </Row>
          </a>

          <a href="https://jspang.com/detailed?id=57" target="_blank">
            <Row className="sl-row">
                <Col span={14} className="sl-title"><Icon type="book"/> Vue2.x学习路线</Col>
                <Col span={8} className="sl-title1">基础到实战</Col>
                <Col span={2}  className="sl-icon"><Icon type="right" /></Col>
            </Row>
          </a>

          <a href="https://jspang.com/detailed?id=58" target="_blank">
            <Row className="sl-row">
                <Col span={14} className="sl-title"><Icon type="book"/> Flutter学习路线</Col>
                <Col span={8} className="sl-title1">基础到实战</Col>
                <Col span={2}  className="sl-icon"><Icon type="right" /></Col>
            </Row>
          </a>
        
        </div>
    )
 }

 export default StudyLine