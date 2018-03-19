<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import moment from 'moment'

  export default {
    components: {
      BarChart
    },
    data: function () {
      return {
        datacollection: null,
        options: { title: {
                display: true,
                text: 'Page views on urls'
              },
              scales: {
                yAxes: [{
                  stacked: true
                }],
                xAxes: [ {
                  stacked: true,
                  barPercentage: 1
                }]
              },
              legend: {
                display: true,
                position: 'bottom'
              },
              responsive: true,
              maintainAspectRatio: false
        },
        startTime: moment(),
        endTime: moment(),
        times: [],
        times_object: [],
        colours: ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080'],
        items: [],
        page_urls_and_amounts: []
      }
    },
    mounted () {
      this.getPageViews()
    },
    methods: {
      getTimeStops(start, end, interval) {
        this.startTime = moment(start, 'HH:mm')
        this.endTime = moment(end, 'HH:mm')
        if (this.endTime.isBefore(this.startTime)) {
          this.endTime.add(1, 'day')
        }
        let timeStops = []
        while (this.startTime <= this.endTime) {
          timeStops.push(moment(this.startTime).format('HH:mm'))
          this.startTime.add(interval, 'minutes')
        }
        this.times = timeStops
      },
      getPageViews() {
        this.getTimeStops('00:00', '23:59', 30)
        this.api.getData('page_view').then((response) => {
          this.items = response.data
          this.items.forEach((item, i) => {
            let pageUrlAndViews = {type: 'bar', label: item.key, backgroundColor: this.colours[i], data: []}
            let buckets = item.group_by_half_hour.buckets
            buckets.forEach((bucket) => {
              let hash = this.times_object
              let time = moment(bucket.key).format('HH:mm')
              hash[time] = bucket.doc_count
              let newArrayDataOfOjbect = Object.values(hash)
              pageUrlAndViews.data = newArrayDataOfOjbect
            })
            this.page_urls_and_amounts.push(pageUrlAndViews)
          })
          this.datacollection = {
            labels: this.times,
            datasets: this.page_urls_and_amounts
          }
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>
