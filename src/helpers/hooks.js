import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import authHeader from './jwt-token-access/auth-token-header';

export function useSystems(email) {
  console.log('getting systems');
  let {data, error} = useSWR(`/systems/getSystemByUser/${email}`, () => axios.post(process.env.REACT_APP_APIURL + '/systems/getSystemByUser', {email: email}, {headers: authHeader()}).then(res => {
		return res.data.systems;
  }).catch(error => {
    console.log(error);
  }));

  return {
    systems: data,
    isError: error,
    isLoading: !data && !error
  }
}

export function useTasks(systemID) {
	let {data, error} = useSWR(`/tasks/get/${systemID}`, () => axios.post(process.env.REACT_APP_APIURL + '/task/get', {systemID: systemID}, {headers: authHeader()}).then(res => {
    return res.data.tasks
	}).catch(error => {
    console.log(error.response.data);
  }));

	return {
		tasks: data,
		isError: error,
		isLoading: !data && !error
	}
}
