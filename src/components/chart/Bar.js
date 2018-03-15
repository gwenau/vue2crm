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

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          type: 'bar',
          label: 'Invoiced',
          backgroundColor: '#12c44c',
          data: [1050, 900, 1000, 850, 820, 420, 700, 1010, 999, 340, 0, 0]
        },
        {
          type: 'bar',
          label: 'Order',
          backgroundColor: 'red',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 120, 90]
        }
      ]}, {
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