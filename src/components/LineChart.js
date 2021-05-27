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
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    }
  },
  mounted () {
    this.update()
    console.log(this.chartPrice + 'ASDASDASD');
    // this.chartData создаётся внутри миксина.
    // Если вы хотите передать опции, создайте локальный объект options
    console.log(this);
    this.renderChart(this.chartData);

  },

  methods: {
    update() {
      this.chartData.datasets[0].data = this.chartPrice;

    }
  },
  watch: {
    chartPrice: function() {
      this.update();
      this.$data._chart.update()
    }
  }
}