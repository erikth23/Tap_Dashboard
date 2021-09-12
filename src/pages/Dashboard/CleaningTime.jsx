import React, {useEffect, useState} from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import {DataStore} from 'aws-amplify';

import {Asset, Clean} from '../../models';

const ONE_WEEK_AGO = new Date(Date.now() - 604800000)

const CleaningTime = ({systemID, roomChosen}) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [accountStatuses, setAccountStatuses] = useState([])
  const [typeButtonExpanded, setTypeButtonExpanded] = useState(false);
  const [statusButtonExpanded, setStatusButtonExpanded] = useState(false);

  useEffect(() => {
      getCleaningData();
  }, [roomChosen])

  const getCleaningData = async () => {
    const data = {};
    const _accountStatuses = [];
    var max_ovr_diff = 0;
    var min_ovr_diff = 60;
    var _average = 0;
    var count = 0;

    try {
      const cleans = await DataStore.query(Clean);

      cleans.filter(clean =>
        (roomChosen === '' || clean.assetID === roomChosen) &&
        (accountStatus === '' || clean.accountStatus === accountStatus)
      ).forEach(async clean => {

        const startTime = new Date(clean.startTime);
        const endTime = new Date(clean.endTime)
        const timeDiff = (Math.round(Math.abs(endTime - startTime)) / (60 * 1000)) / clean.timeDiv;

        if(timeDiff < 1 || timeDiff > 90) {
          return;
        }

        count++;
        _average = (_average * (count - 1) + timeDiff) / count;

        if(startTime < ONE_WEEK_AGO) {
          return;
        }

        const date = startTime.getDate();
        if(!data[date]) {
          data[date] = {
            total_min: timeDiff,
            total: 1,
            day: startTime
          }
        } else {
          data[date].total += 1;
          data[date].total_min += timeDiff;
        }
      });
    } catch (err) {
      console.error("Unable to get cleaning data", err)
    }

    var data_arr = [];
    for(var key in data) {
      data_arr.push(data[key])
    }
    data_arr = data_arr.sort((a, b) => a.day - b.day)

    setSeries([
      {
        name: "Average Cleaning Time",
        data: data_arr.map(item => {
          const avg_diff = Math.round(item.total_min / item.total)

          if(avg_diff < min_ovr_diff) {
            min_ovr_diff = avg_diff
          }

          if(avg_diff > max_ovr_diff) {
            max_ovr_diff = avg_diff
          }
          return avg_diff;
        })
      }
    ])

    setOptions({
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Average Cleaning Time',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: data_arr.map(item => `${item.day.getMonth() + 1}/${item.day.getDate()}`),
        title: {
          text: 'Day'
        }
      },
      yaxis:
      {
        title: {
          text: 'Average Time(Minutes)'
        },
        min: Math.max(min_ovr_diff < _average ? min_ovr_diff - 5 : _average - 5, 0),
        max: max_ovr_diff > _average ? max_ovr_diff + 5 : _average + 5
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      annotations: {
        yaxis: [
          {
            y: _average,
            borderColor: '#000',
            label: {
              borderColor: "#000",
              style: {
                color: '#fff',
                background: '#000'
              },
              text: 'Average'
            }
          }
        ]
      }
    })
  }

  return (
    <div id = "chart" >
      <div className="d-flex">
        <div className="d-flex mr-4">
          <Dropdown
            isOpen={typeButtonExpanded}
            toggle={() => setTypeButtonExpanded(!typeButtonExpanded)}
            className="mr-2"
            >
            <DropdownToggle className="btn btn-secondary" caret>
              {roomType ? `${roomType} ` : "Room Type "}
              <i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {
                roomTypes && roomTypes.map((item, i) => (
                    <DropdownItem key={i} onClick={() => {
                        setTypeButtonExpanded(false)
                        setRoomType(item)
                      }}>{item}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
          {
            roomType !== '' &&
            <Button className="btn-danger " onClick={() => setRoomType('')}><i className="bx bx-x-circle"/></Button>
          }
        </div>
        <div className='d-flex'>
          <Dropdown
            isOpen={statusButtonExpanded}
            toggle={() => setStatusButtonExpanded(!statusButtonExpanded)}
            className="mr-2"
            >
            <DropdownToggle className="btn btn-secondary" caret>
              {accountStatus ? `${accountStatus} ` : "Account Status "}
              <i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {
                accountStatuses && accountStatuses.map((item, i) => (
                    <DropdownItem key={i} onClick={() => {
                        setStatusButtonExpanded(false)
                        setAccountStatus(item)
                      }}>{item}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
          {
            accountStatus !== '' &&
            <Button className="btn-danger " onClick={() => setAccountStatus('')}><i className="bx bx-x-circle"/></Button>
          }
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={350}/>
    </div>
  );
}

export default CleaningTime;
