import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSelectedEmployee, setSelectedEmployee } from '../../Redux/employeeSlice';
import { Table } from 'antd';

const SingleEmployeeData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const employee = useSelector(selectSelectedEmployee);
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
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/employee/${5}`);
        const result = await response.json();
        if (result.status === 'success' && result.data !== null) {
          dispatch(setSelectedEmployee(result.data));
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, id]);
  return (
    <div>
      <h2>Employee Details</h2>
      {employee && (
        <Table dataSource={[employee]} columns={columns} pagination={false} />
      )}
    </div>
  );
};

export default SingleEmployeeData;

