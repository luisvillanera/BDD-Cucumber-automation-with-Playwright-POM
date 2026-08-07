/** Dummy REST API — https://dummy.restapiexample.com */

export const DUMMY_API_BASE = 'https://dummy.restapiexample.com/api/v1';

export const dummyApi = {
  employees: `${DUMMY_API_BASE}/employees`,
  employee: (id: number | string) => `${DUMMY_API_BASE}/employee/${id}`,
  create: `${DUMMY_API_BASE}/create`,
  update: (id: number | string) => `${DUMMY_API_BASE}/update/${id}`,
  delete: (id: number | string) => `${DUMMY_API_BASE}/delete/${id}`,
};

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export type EmployeePayload = {
  name: string;
  salary: string;
  age: string;
};

export function newEmployeePayload(suffix = Date.now()): EmployeePayload {
  return {
    name: `Auto User ${suffix}`,
    salary: '55000',
    age: '30',
  };
}
