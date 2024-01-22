import React from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../Redux/employeeSlice';
import { Modal, Button, Form, Input } from 'antd';

const UpdateEmployeeForm = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleUpdateConfirm = async (employeeId) => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/v1/update/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.status === 'success' && result.data !== null) {
        dispatch(updateEmployee({ id: employeeId,  updatedData: result.data }));
        form.resetFields();
        props.setIsModalVisible(false);
      } else {
        console.error('Error updating employee data:', result.message);
      }
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  const handleModalClose = () => {
    form.resetFields();
    props.setIsModalVisible(false);
  };

  return (
    <Modal
      open={props.isModalVisible}
      title="Update Employee Record"
      onCancel={handleModalClose}
      footer={[
        <Button key="back" onClick={handleModalClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => handleUpdateConfirm(props.selectedEmployee.id)}
        >
          Update Employee
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Employee ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Employee Name"
          rules={[{ required: true, message: 'Please enter employee name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Employee Salary"
          rules={[{ required: true, message: 'Please enter employee salary' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Employee Age"
          rules={[{ required: true, message: 'Please enter employee age' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEmployeeForm;

