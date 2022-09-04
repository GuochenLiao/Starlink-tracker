import React, { Component } from "react";
import { Row, Col } from "antd";
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";
import axios from "axios";
import {
  SAT_API_KEY,
  STARLINK_CATEGORY,
  NEARBY_SATELLITE,
  BASE_URL,
} from "../constants";

class Main extends Component {
  state = {
    setting: {},
    satInfo: {},
    satList: [],
    isLoadingList: false,
  };

  showNearbySatellite = (setting) => {
    console.log(setting);
    this.setState({ setting: setting });
    this.fetchSatellite(setting);
  };
  fetchSatellite = (setting) => {
    console.log("fetching");
    const { latitude, longitude, elevation, altitude } = setting;
    const url = `${BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
    this.setState({ isLoadingList: true });

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ satInfo: res.data, isLoadingList: false });
        }
      })
      .catch((err) => {
        console.log("err in fetching satellite: ", err.message);
        this.setState({ isLoadingList: false });
      });
  };

  showMap = (selected) => {
      this.setState( pre => {
          return {
              ...pre,
              satList: [...selected]
          }
      })
  };

  render() {
    const { satList, setting, satInfo, isLoadingList } = this.state;
    return (
      <Row className="main">
        <Col span={8} className="left-side">
          <SatSetting onShow={this.showNearbySatellite} />
          <SatelliteList
            satInfo={satInfo}
            isLoad={isLoadingList}
            onShowMap={this.showMap}
          />
        </Col>
        <Col span={16} className="right-side">
          <WorldMap satData={satList} observerData={setting}/>
        </Col>
      </Row>
    );
  }
}
export default Main;
