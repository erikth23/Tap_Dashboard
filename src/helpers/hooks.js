import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

export function useSystems(email) {
  let {data, error} = useSWR(`/systems/getSystemByAdmin/${email}`, () => axios.post(process.env.REACT_APP_APIURL_DEV + '/systems/getSystemByAdmin', {adminEmail: email}).then(res => {
    return res.data;
  }));

  return {
    systems: data,
    isError: error,
    isLoading: !data && !error
  }
}

export function useRooms(systemID) {
  let {data, error} = useSWR(`/rooms/getRooms/${systemID}`, () => axios.post(process.env.REACT_APP_APIURL_DEV + '/rooms/getRooms', {systemID: systemID}).then(res => {
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
