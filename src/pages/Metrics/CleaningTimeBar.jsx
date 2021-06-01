import React, {useEffect, useState} from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

import {useCleaningTimes} from "../../helpers/hooks";

const CleaningTimeBar = ({systemID}) => {
  const {times, isError, isLoading} = useCleaningTimes(systemID)
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if(!isLoading) {
      const data = {};
      var max_ovr_diff = 0;
      var min_ovr_diff = 60;

      times.forEach((time, i) => {
        const start_date = new Date(time.startTime);
        const end_date = new Date(time.endTime);
        const one_week_ago = new Date(Date.now() - 604800000)
        const min_diff = Math.round(Math.abs(end_date - start_date)) / (60 * 1000)

        if(min_diff < 1 || min_diff > 60) {
          return;
        }

        if(start_date < one_week_ago) {
          return;
        }

        const date = start_date.getDate();
        if(!data[date]) {
          data[date] = {
            total_min: min_diff,
            total: 1,
            day: start_date
          }
        } else {
          data[date].total += 1;
          data[date].total_min += min_diff;
        }
      });

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
            const avg_diff = Math.round(item.total_min / item.total)

            if(avg_diff < min_ovr_diff) {
              min_ovr_diff = avg_diff
            }

            if(avg_diff > max_ovr_diff) {
              max_ovr_diff = avg_diff
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
          min: min_ovr_diff - 5,
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
  }, [times])

  return (
    <div id = "chart" >
      <ReactApexChart options={options} series={series} type="line" height={350}/>
    </div>
  );
}

export default CleaningTimeBar;
