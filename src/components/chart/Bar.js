// import 'chart.js'
// import {Bar} from 'vue-chartjs'

// export default Bar.extend({
//   data: function () {
//     return {
//       items: []
//     }
//   },
//   methods: {
//     getPageViews() {
//       this.api.getData('page_view').then((res) => {
//         this.items = res.data
//         console.log(this.items)
//       }, (err) => {
//         console.log(err)
//       })
//     }
//   },
//   mounted () {
//     this.getPageViews()
//     this.renderChart({
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//       datasets: [
//         {
//           label: 'Data One',
//           backgroundColor: '#f87979',
//           data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
//         }
//       ]
//     }, {responsive: true, maintainAspectRatio: false})
//   }
// })
import moment from 'moment'
import { Bar } from 'vue-chartjs'
import _ from 'lodash'

export default {
  extends: Bar,
  data: function () {
    return {
      times: ['00:00', '00:30', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
      times_object: [],
      colours: ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080', '#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080', '#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080'],
      page_urls_and_amounts: []
    }
  },
  methods: {
    mapTimes() {
      this.times_object = _.zipObject(this.times, _.map(this.times, function() { return 0}))
    },
    getPageViews() {
      this.api.getData('page_view').then((res) => {
        this.items = res.data
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
        console.log('page_urls_and_amounts', this.page_urls_and_amounts)
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.mapTimes()
    this.getPageViews()
    this.renderChart({
      labels: this.times,
      datasets: this.page_urls_and_amounts},
      {
        title: {
          display: true,
          text: 'Oversikt'
        },
        scales: {
          yAxes: [{
            stacked: true
          }],
          xAxes: [ {
            stacked: true,
            categoryPercentage: 0.5,
            barPercentage: 1
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    )
  }
}