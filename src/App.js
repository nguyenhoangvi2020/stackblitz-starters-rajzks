import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';

import './style.css';

import { createDirectus } from '@directus/sdk';
import { rest, readItems } from '@directus/sdk/rest';

const client = createDirectus(
  'https://directus-production-2ee7.up.railway.app'
).with(rest());

const App = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderData = async function () {
    console.log('fetching..');

    const result = await client.request(readItems('orders'));

    console.log(result);
    setOrders(result);
  };

  useEffect(() => {
    console.log('effect..');
    fetchOrderData();
  }, []);

  return (
    <div>
      <Row gutter={16}>
        {orders.length > 0 &&
          orders.map((order) => (
            <Col span={4} key={order.orderId}>
              <Card title={order.displayID} bordered={false}>
                <UserSwitchOutlined /> {order.driverName}
                <br />
                Tài xế: {order.orderId}
                <br />
                Tài xế: {order.orderId}
                <br />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default App;
