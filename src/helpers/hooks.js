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

export function useRooms(systemID) {
  let {data, error} = useSWR(`/rooms/getRooms/${systemID}`, () => axios.post(process.env.REACT_APP_APIURL + '/rooms/getRooms', {systemID: systemID}, {headers: authHeader()}).then(res => {
		return res.data.rooms.sort((a, b) => {
			return a._id > b._id ? 1 : -1
		});
  }));

  return {
    rooms: data,
    isError: error,
    isLoading: !data && !error
  }
}

export function useTasks(systemID) {
	let {data, error} = useSWR(`/systems/getTasks/${systemID}`, () => axios.post(process.env.REACT_APP_APIURL + '/task/getTasks', {systemID: systemID}, {headers: authHeader()}).then(res => {
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
