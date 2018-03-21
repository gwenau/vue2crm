<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="options">
    </bar-chart>
    <button class="button is-primary" @click="getPageViews('2017-06-01T00:00:00.000Z', '2017-06-02T00:00:00.000Z', 10)">10 minute intervals</button>
    <button class="button is-primary" @click="getPageViews('2017-06-01T00:00:00.000Z', '2017-06-02T00:00:00.000Z', 30)">30 minute intervals</button>
    <button class="button is-primary" @click="getPageViews('2017-06-01T00:00:00.000Z', '2017-06-02T00:00:00.000Z', 60)">60 minute intervals</button>
  </div>
  </div>
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
        startDate: moment(),
        endDate: moment(),
        startTime: moment(),
        endTime: moment(),
        times: [],
        colours: ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080'],
        items: []
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
        return timeStops
      },
      getPageViews(startDate = '2017-06-01T00:00:00.000Z', endDate = '2017-06-02T00:00:00.000Z', interval = 30) {
        this.api.getData(`page_view.json?start_date=${startDate}&end_date=${endDate}&interval=${interval}`).then((response) => {
          let timesObject = []
          this.items = response.data
          this.datacollection = Object.assign({})
          this.$set(this.datacollection, 'labels', [])
          this.$set(this.datacollection, 'datasets', [])
          this.times = Object.assign([])
          this.times = this.getTimeStops('00:00', '23:59', interval)
          this.items.forEach((item, i) => {
            let pageUrlAndViews = {type: 'bar', label: item.key, backgroundColor: this.colours[i], data: []}
            let buckets = item.group_by_time_interval.buckets
            buckets.forEach((bucket) => {
              let hash = timesObject
              let time = moment(bucket.key).format('HH:mm')
              hash[time] = bucket.doc_count
              let newArrayDataOfOjbect = Object.values(hash)
              pageUrlAndViews.data = newArrayDataOfOjbect
            })
            this.datacollection.labels = this.times
            this.datacollection.datasets.push(pageUrlAndViews)
          })
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>
