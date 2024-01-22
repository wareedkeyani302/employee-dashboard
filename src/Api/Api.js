import { setData, setLoading, setError } from '../Redux/employeeSlice';

export const fetchEmployeeData = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
    const data = await response.json();
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
