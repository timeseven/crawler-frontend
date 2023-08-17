import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Button, message } from "antd";
import axios from "../../axios";
import ReactECharts from "echarts-for-react";
import "./Home.css";
import moment from "moment";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: responseResult.DataStructure;
}

class Home extends Component {
  state: State = {
    loaded: false,
    isLogin: true,
    data: {},
  };

  componentDidMount(): void {
    axios.get("/api/isLogin").then((res) => {
      const data: responseResult.isLogin = res.data;
      if (!data) {
        this.setState({ isLogin: false, loaded: true });
      } else {
        this.setState({
          loaded: true,
        });
      }
    });
    this.handleShowData();
  }

  handleLogout = () => {
    axios.get("/api/logout").then((res) => {
      const data: responseResult.logout = res.data;
      if (data) {
        this.setState({ isLogin: false });
      } else {
        message.error("Logout Failed");
      }
    });
  };
  handleGetData = () => {
    axios.get("/api/getData").then((res) => {
      const data: responseResult.getData = res.data;
      if (data) {
        message.success("GetData Success");
        setTimeout(() => this.handleShowData(), 2500);
      } else {
        message.error("GetData Failed");
      }
    });
  };
  handleShowData = () => {
    axios.get("/api/showData").then((res) => {
      const data: responseResult.showData = res.data;
      console.log("showData", res);
      if (data) {
        this.setState({
          data: data,
        });
      } else {
        message.error("ShowData Failed");
      }
    });
  };
  getOption: () => echarts.EChartsOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const { title, count } = innerItem;
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title] ? tempData[title].push(count) : (tempData[title] = [count]);
      });
    }
    const result: echarts.SeriesOption[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }
    return {
      title: {
        text: "Views",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: courseNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  };

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button type="primary" onClick={this.handleGetData}>
                Get Data
              </Button>
              <Button type="primary" danger onClick={this.handleLogout}>
                Exit
              </Button>
            </div>
            <ReactECharts option={this.getOption()} />
          </div>
        );
      }
      return null;
    }
    return <Navigate to="/login" />;
  }
}

export default Home;
