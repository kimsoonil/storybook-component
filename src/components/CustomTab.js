import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';

export function CustomTab({ elements }) {
  const navigate = useNavigate();
  const { source } = useParams();
  const { TabPane } = Tabs;

  return (
    <Tabs
      activeKey={source}
      onChange={(path) => {
        navigate(`${path}`); // sibling path
      }}
      // tabBarGutter={70}
      tabBarStyle={{ backgroundColor: 'white' }}
      // size="large"
      className="Tabs"
    >
      {elements.map((element) => (
        <TabPane tab={element.tabTitle} className="TabsBody" key={element.path}>
          {element.tabBody}
        </TabPane>
      ))}
    </Tabs>
  );
}
