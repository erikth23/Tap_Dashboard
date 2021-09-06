import axios from 'axios';
import {useCallback, useEffect, useState} from 'react'
import useSWR from 'swr';
import authHeader from './jwt-token-access/auth-token-header';

const GET_CLEANING_TIME_APIURL = "https://271kt734c3.execute-api.us-east-1.amazonaws.com/dev/GetCleaningTime"
const ASSET_PREFIX = "asset@"

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

export function useContextMenu() {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [assetID, setAssetID] = useState('')

  const handleContextMenu = useCallback(
    (event) => {
      if(event.srcElement &&
        event.srcElement.value &&
        event.srcElement.value.includes(ASSET_PREFIX)) {
        event.preventDefault();
        setAnchorPoint({ x: event.layerX, y: event.layerY });
        setShow(true);
        setAssetID(event.srcElement.value.split('@')[1])
      }
    },
    [setShow, setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });
  return { anchorPoint, show, assetID };
};
