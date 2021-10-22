import React, {useEffect, useState} from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import {DataStore} from 'aws-amplify';

import {Clean} from '../../models';

const ONE_WEEK_AGO = new Date(Date.now() - 604800000)

const CleaningTimeBar = ({systemID}) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [accountStatuses, setAccountStatuses] = useState([]);
  const [typeButtonExpanded, setTypeButtonExpanded] = useState(false);
  const [statusButtonExpanded, setStatusButtonExpanded] = useState(false);

  useEffect(() => {
      getCleaningData();
  }, [])

  const getCleaningData = async () => {
    const data = {};
    var max_ovr_diff = 0;
    var min_ovr_diff = 60;

    try {
      const cleans = await DataStore.query(Clean, c => c.startTime("gt", ONE_WEEK_AGO.toISOString()));

      cleans.forEach(clean => {
        const startTime = new Date(clean.startTime);
        const endTime = new Date(clean.endTime)
        const timeDiff = (Math.round(Math.abs(endTime - startTime)) / (60 * 1000)) / clean.timeDiv;

        if(timeDiff < 1 || timeDiff > 90) {
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
        type: "line",
        data: data_arr.map(item => {
          const total = item.total
          const avg_diff = Math.round(item.total_min / total)

          if(avg_diff < min_ovr_diff) {
            min_ovr_diff = avg_diff
          }

          if(avg_diff > max_ovr_diff) {
            max_ovr_diff = avg_diff
          }

          if(total < min_ovr_diff) {
            min_ovr_diff = total
          }

          if(total > max_ovr_diff) {
            max_ovr_diff = total
          }

          return avg_diff;
        })
      },
      {
        name: "Total Rooms Cleaned",
        type: "column",
        data: data_arr.map(item => item.total)
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
      colors: ['#77B6EA', ''],
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
        min: Math.max(min_ovr_diff - 5, 0),
        max: max_ovr_diff + 5
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
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

export default CleaningTimeBar;
