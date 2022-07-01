import React, { Component } from 'react';
import RequestBuildRes from "./page/BuildRes"
import axios from "axios";
// 封装组件
class Hellow extends React.Component{
    constructor(props) {
        super(props);
        // 设置初始透明度为1
        // this.state = {opacity:1.0}
        this.state = {test: {}}
    }
    // 组件渲染后调用
    componentDidMount(){
        // 设置定时器并赋值给 timer
        let timer = setInterval(function(){
            // 为当前透明度赋值为 opacity
            // let opacity = this.state.opacity;
            let data=this.state.test;
            // 设置 opacity每300毫秒 -=0.1，以区别显示效果
            // opacity -= 0.1;
            axios.get(`http://127.0.0.1:80/build/request-result?pipeline_build_id=1`).then((response) => {
                data=response.data.data;
                console.log(this.data);
                this.setState({
                        test: data
                    });

            });
            console.log(this.state.test.status);
            if(this.state.test.status=="success"){
                clearInterval(timer);
            }

            // 判断透明度是否小于0.1，如果小于就变为1
            // if( status == 'Finished' ){
            //     opacity = 1.0;
            // }else{
            //     opacity=0.1;
            // }
            // 设置需要改变的数据

            // 在定时器中绑定this，确保每次this指向一样
        }.bind(this),300);
    }

    render(){
        return(
            // 将最新的 opacity 复制给当前 opacity
            <div style={{opacity:1}}>
                {/* 从外部取name值 */}
                {this.state.test.status}
            </div>
        );
    }
}

export default Hellow;
