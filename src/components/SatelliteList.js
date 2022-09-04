import React, { Component } from "react";
import { Button, Spin, Avatar, List, Checkbox } from "antd";

import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
  state = {
    selected: [],
  };

  onChange = (e) => {
    const { dataInfo, checked } = e.target;
    const { selected } = this.state;
    const list = this.addOrRemove(dataInfo, checked, selected);
    this.setState({ selected: list });
  };

  addOrRemove = (item, status, list) => {
      const found = list.some( entry => entry.satid === item.satid);
      if (!found && status) {
          list = [...list, item];
      }
      if (found && !status) {
          list = list.filter( entry => entry.satid !== item.satid);
      }
      return list;
  }

  onShowSatMap = () => {
      this.props.onShowMap(this.state.selected);
  }

  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];

    return (
      <div className="sat-list-box">
        <div className="btn-container">
          <Button className="sat-list-btn" type="primary" onClick={this.onShowSatMap} disabled={this.state.selected.length === 0}>
            Track
          </Button>
        </div>
        <hr />
        {this.props.isLoad ? (
          <Spin tip="loading" size="large" />
        ) : (
          <List
            className="sat-list"
            itemLayout="horizontal"
            size="small"
            dataSource={satList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox dataInfo={item} onChange={this.onChange} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={satellite} />}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default SatelliteList;
