import { Line} from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  extends: Line,
  // mixins: [reactiveProp],
  // props: ['options'],
  data () {
    return {
      
      chartData: {
        labels: [65, 59, 80, 81, 56, 55, 40],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
      }
    }
  },
  mounted () {
    // this.chartData создаётся внутри миксина.
    // Если вы хотите передать опции, создайте локальный объект options
    this.renderChart(this.chartData, this.options)
  }
}