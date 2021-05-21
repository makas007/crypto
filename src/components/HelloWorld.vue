<template>
  <div class="hello">
    <h1>
      {{ a }}
    </h1>
    <p>{{ price}}</p>
    <ul>
      <div v-for="item in price" :key="item">
        {{ item.s }}
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      cryptoName: 'btcusdt',
      price: '',
      a: '',
      q: null,
      streams: [
        'ethusdt@miniTicker', 'btcusdt@miniTicker', 'maticusdt@miniTicker',
        'adausdt@miniTicker', 'xrpusdt@miniTicker'
      ]
    }
  },
  mounted(){
    this.getCryptoData()
    this.a = parseFloat(this.price.p)
    // console.log(this.ws)
    // console.log(this.q.data, 'EVENT')
    // console.log('asdasda');
  },
  methods: {
    getCryptoData() {
      // this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`)
      this.ws = new WebSocket("wss://stream.binance.com:9443/ws/" + this.streams.join('/'));
      // wss://stream.binance.com:9443/ws/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker/
      // this.ws = new WebSocket('wss://stream.binance.com:9443/ws/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker')
      this.ws.onmessage = event => {
        //  console.log(event.data);
        this.price = JSON.parse(event.data)
        this.a = parseFloat(this.price.p).toFixed(2)
        // console.log(this.q);
      }
      // this.a = this.price.p
    },
    // getCryptoTable () {
    //   this.ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr')
    //   this.ws.onmessage = function(evt) {
    //     let msgs = JSON.parse(evt.data);
    //     if (Array.isArray(msgs)) {
    //       for (let msg of msgs) {
    //         handleMessage(msg);
    //       }
    //     }
    //   }
    // },
    // handleMessage() {
    //   this.a = 
    // }
  }
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
