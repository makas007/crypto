<template>
  <div class="hello">
    <h1>
      <!-- {{ trackedStreams }} -->
    </h1>
    <!-- <p>{{ trackedStreams }}</p> -->
    <ul>
      <div v-for="item, i  in Object.entries(trackedStreams)" :key="i" >
        {{ item }}
      </div>
    </ul>
    <ul>
      <div v-for="itm, idx in Object.keys(trackedStreams)" :key="idx">
        {{ itm  }}
      </div>
    </ul>
    <line-chart :chart-data="datacollection" :chartPrice="chartPrice" v-if="chartPrice.length"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
export default {
  
  data() {
    return {
      ws: null,
      datacollection: null,
      cryptoName: 'btcusdt',
      price: null,
      fixPrice: null,
      separateCrypto: null,
      trackedOnePrice: null,
      qweqwe: [12,34,45,34,56,76,45,23,12],
      trackedStreams: [],
      streams: [
        'ethusdt@miniTicker', 'btcusdt@miniTicker', 'maticusdt@miniTicker',
        'adausdt@miniTicker', 'xrpusdt@miniTicker'
      ],
      chartPrice: [],
      arr: []

    }
  },
  mounted(){
    this.getCryptoData()
    this.a = parseFloat(this.price).toFixed(2)
    this.getOneCryptoData()
    console.log(this.trackedStreams)
    // console.log('asdasda');
    console.log(this.chartPrice);
  },
  methods: {
    getCryptoData() {
      // this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`)
      this.ws = new WebSocket("wss://stream.binance.com:9443/ws/" + this.streams.join('/'));
      // wss://stream.binance.com:9443/ws/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker/
      // this.ws = new WebSocket('wss://stream.binance.com:9443/ws/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker')
      this.ws.onmessage = event => {
        this.price = JSON.parse(event.data);
        let tmp = {...this.trackedStreams}
        tmp[this.price.s] = this.price.c;
        this.trackedStreams = tmp;
        // console.log(this.trackedPrices);

      }
    },
    getOneCryptoData() {
      this.separateCrypto = new WebSocket(`wss://stream.binance.com:9443/ws/${this.cryptoName}@trade`)
      this.separateCrypto.onmessage = e => {
        this.trackedOnePrice = JSON.parse(e.data)
        // console.log(this.trackedOnePrice.p);
        this.chartPrice.push(+this.trackedOnePrice.p)
        
        // if(this.chartPrice.length == 15) {
          this.arr = [...this.chartPrice.slice(1), +this.trackedOnePrice.p]
          // console.log(this.arr);
          // console.log(this.arr.length);
          // console.log(this.chartPrice);
        // }
        // console.log(this.chartPrice);
        // this.arr = [...this.chartPrice.slice(1), +this.trackedOnePrice.p]
        // console.log(this.arr);
      }
    }
  },
  components: {
    LineChart
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
