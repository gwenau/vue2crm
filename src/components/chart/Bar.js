import 'chart.js'
import {Bar} from 'vue-chartjs'

export default Bar.extend({
  data: function () {
    return {
      items: []
    }
  },
  methods: {
    getPageViews() {
      this.api.getData('page_view').then((res) => {
        this.items = res.data
        console.log(this.items)
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getPageViews()
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
