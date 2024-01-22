import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import { setEmployees, selectEmployees, deleteEmployee, addEmployee } from '../../Redux/employeeSlice';
import UpdateEmployeeForm from '../Update/UpdateEmployeeForm';
import AddEmployeeForm from '../AddEmployee/AddEmployeeForm';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
    },
    {
      title: 'Salary',
      dataIndex: 'employee_salary',
      key: 'employee_salary',
    },
    {
      title: 'Age',
      dataIndex: 'employee_age',
      key: 'employee_age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='btn'>
          <Button type="link" onClick={() => handleViewClick(record.id)}>
            View
          </Button>
          <Button onClick={() => handleUpdateClick(record)} >
            UpDate
          </Button>
          <Button onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/employees');
        const result = await response.json();
        dispatch(setEmployees(result.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleViewClick = (employeeId) => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/v1/employee/${employeeId}`);
        const result = await response.json();

        if (result.status === 'success' && result.data !== null) {
          setSelectedEmployee(result.data);
          setIsModalVisible(true);
        } else {
          console.error('Error fetching employee data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();

  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleUpdateClick = (record) => {
    setSelectedEmployee(record);
    setIsUpdateModalVisible(true);
    console.log('Selected Employee ID:', record.id);
  };
  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`/api/v1/delete/${employeeId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.status === 'success') {
        dispatch(deleteEmployee(employeeId));
        console.log('Employee deleted successfully.');
      } else {
        console.error('Error deleting employee:', result.message);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  const handleAddEmployee = async (newEmployeeData) => {
    try {
      const response = await fetch('/api/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      const result = await response.json();

      if (result.status === 'success' && result.data !== null) {
        dispatch(addEmployee(result.data));
        console.log('Employee added successfully.');
        setIsAddFormVisible(false);
      } else {
        console.error('Error adding employee:', result.message);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };


  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Button type="primary" onClick={() => setIsAddFormVisible(true)}>
        Open Add Employee Form
      </Button>

      {isAddFormVisible && (
        <AddEmployeeForm onSubmit={handleAddEmployee} />
      )}

      <Modal
        title="Employee Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedEmployee && (
          <div>
            <p>ID: {selectedEmployee.id}</p>
            <p>Name: {selectedEmployee.employee_name}</p>
            <p>Salary: {selectedEmployee.employee_salary}</p>
            <p>Age: {selectedEmployee.employee_age}</p>
          </div>
        )}
      </Modal>
      {isUpdateModalVisible && selectedEmployee && (
        <UpdateEmployeeForm
          isModalVisible={isUpdateModalVisible}
          selectedEmployee={selectedEmployee}
          setIsModalVisible={setIsUpdateModalVisible}
        />
      )}
    </>
  );
};

export default EmployeeTable;
