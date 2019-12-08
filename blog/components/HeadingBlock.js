import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "./Heading";

class HeadingBlock extends PureComponent {
  renderHtml = () => {
    const { level, children } = this.props;

    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <>
            <Heading level={`h${level}`} id={nodeValue}>
            <a href={`#${nodeValue}`} className="link">
                #
            </a>
            <span className="title">{children}</span>
            
            </Heading>
           

        </>
      );
    } else {
      return <>{children}</>;
    }
  };

 

  render() {
    return (<>
        {this.renderHtml()}
       
     </>);
  }
}

export default HeadingBlock;