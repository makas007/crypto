import { Line } from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  extends: Line,
  // mixins: [reactiveProp],
  props: ['chartPrice'],
  data () {
    return {
      chartData: {
        labels: [12,34,45,67,78],
          datasets: [{
            label: 'My First Dataset',
            // data: this.chartPrice,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
      }
    }
  },
  mounted () {
    console.log(this.chartPrice + 'ASDASDASD');
    // this.chartData создаётся внутри миксина.
    // Если вы хотите передать опции, создайте локальный объект options
    this.renderChart(this.chartData, this.options)
  },

  methods: {
    
  }
}