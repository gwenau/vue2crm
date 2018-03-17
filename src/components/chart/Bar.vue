<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import moment from 'moment'
  import _ from 'lodash'

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
        times: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
        times_object: [],
        colours: ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080', '#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080', '#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080'],
        items: [],
        page_urls_and_amounts: []
      }
    },
    mounted () {
      this.getPageViews()
    },
    methods: {
      mapTimes() {
        this.times_object = _.zipObject(this.times, _.map(this.times, function() { return 0}))
      },
      getPageViews() {
        this.mapTimes()
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
