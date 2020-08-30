import React from "react";
import "./Filters.css";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const Filters = ({ onFiltersChange }) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={() => onFiltersChange()}
      className="site-form"
    >
      <Form.Item label="Метро" name="station">
        <Select defaultValue="1" style={{ width: 100, textAlign: "center" }}>
          <Option value="1">Метро 1</Option>
          <Option value="2">Метро 2</Option>
          <Option value="3">Метро 3</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Шаг" name="step">
        <Select defaultValue="1" style={{ width: 50, textAlign: "center" }}>
          <Option value="1">1км</Option>
          <Option value="2">2км</Option>
          <Option value="3">3км</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Input.Group compact>
          <Form.Item label="Конкуренты" name="enemies_from">
            <Input
              style={{ width: 100, textAlign: "center" }}
              placeholder="от"
            />
          </Form.Item>
          <Form.Item>
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: "none",
              }}
              placeholder="~"
              disabled
            />
          </Form.Item>
          <Form.Item name="enemies_to">
            <Input
              className="site-input-right"
              style={{
                width: 100,
                textAlign: "center",
              }}
              placeholder="до"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Form>
  );
};

export default Filters;
