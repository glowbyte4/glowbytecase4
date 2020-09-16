import React from "react";
import "./Filters.css";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const Filters = ({ onFiltersChange, stations }) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={onFiltersChange}
      className="site-form"
    >
      <Form.Item label="Метро" name="station">
        <Select
          style={{ width: 200, textAlign: "center" }}
          showSearch
          placeholder="Выберите метро"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          optionFilterProp="children"
        >
          {stations.map((station) => (
            <Option key={station.id} value={station.id}>
              {station.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Filters;
