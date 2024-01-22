import React,{useState} from 'react';
import { Button } from 'antd';


const AddEmployeeForm = ({ onSubmit }) => {
  const [employeeData, setEmployeeData] = useState({
    // employeeiId: '',
    employee_name: '',
    employee_salary: '',
    employee_age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stoppropagation();
    onSubmit(employeeData);
  };

  return (
    <form onSubmit={handleSubmit} className='add-employee'>
      {/* <label className='heading'>
        Employee id
        <input type='number' name='employee_id' value={employeeData.employeei_id} onChange={handleChange} className='user-data' />
      </label>
      <br /> */}
      <label className='heading'>
        Name:
        <input type="text" name="employee_name" value={employeeData.employee_name} onChange={handleChange} className='user-data' />
      </label>
      <br />
      <label className='heading'>
        Salary:
        <input type="number" name="employee_salary" value={employeeData.employee_salary} onChange={handleChange} className='user-data' />
      </label>
      <br />
      <label className='heading'>
        Age:
        <input type="number" name="employee_age" value={employeeData.employee_age} onChange={handleChange} className='user-data' />
      </label>
      <br />
      <button className='add-button' type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;

