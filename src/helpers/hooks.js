import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import authHeader from './jwt-token-access/auth-token-header';

const GET_CLEANING_TIME_APIURL = "https://271kt734c3.execute-api.us-east-1.amazonaws.com/dev/GetCleaningTime"

export function useSystems(email) {
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

export function useCleaningTimes(systemID) {
  let {data, error} = useSWR(`/getCleaningTime/${systemID}`, () => axios.post(GET_CLEANING_TIME_APIURL, {systemID: systemID}).then(res => {
    console.log(res.data)
    return res.data
  }).catch(error => {
    console.log(error)
  }));

  return {
    times: data,
    isError: error,
    isLoading: !data && !error
  }
}
