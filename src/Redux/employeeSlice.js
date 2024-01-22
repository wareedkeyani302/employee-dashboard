import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    selectedEmployee: null
  },
  reducers: {
    setEmployees: (state, action) => {
      state.data = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      state.data.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
      }
    },
    deleteEmployee: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((employee) => employee.id !== idToDelete);
    },
  },
});

export const { setEmployees,setSelectedEmployee, addEmployee,  updateEmployee, deleteEmployee, } = employeeSlice.actions;
export const selectEmployees = (state) => state.employee.data;
export const selectSelectedEmployee = (state) => state.employee.selectedEmployee;
export default employeeSlice.reducer;
