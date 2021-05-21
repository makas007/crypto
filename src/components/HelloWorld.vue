<template>
  <div class="hello">
    <h1>
      <!-- {{ price.s }} -->
    </h1>
    <!-- <p>{{ price }}</p> -->
    <ul>
      <div v-for="item in trackedStreams" :key="item" >
        {{ item }}
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
      price: null,
      fixPrice: null,
      q: null,
      trackedPrices: null,
      trackedStreams: {},
      streams: [
        'ethusdt@miniTicker', 'btcusdt@miniTicker', 'maticusdt@miniTicker',
        'adausdt@miniTicker', 'xrpusdt@miniTicker'
      ]

    }
  },
  mounted(){
    this.getCryptoData()
    this.a = parseFloat(this.price)
  
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
        this.price = JSON.parse(event.data);
        let tmp = {...this.trackedStreams}
        // let tmp = Object.assign({},this.trackedStreams);
        tmp[this.price.s] = this.price.c;
        this.trackedStreams = tmp;
        
        // console.log(this.trackedPrices);

        // console.log(this.trackedStreams);
        // this.trackedStreams[this.price.c] = this.price.c

        // console.log(this.trackedStreams);

          // for(const [key, value] of Object.entries(this.price)){
          //   this.handleMessage(this.price[msg])
          //   this.trackedStreams.push({name: msg.s, price: msg.c})
          //   console.log(key,value);
          // }

          // for(const key in this.price){
          //   //this.trackedStreams.push({name: msg.s, price: msg.c})
          //   console.log(key);
          // }
        //this.fixPrice = parseFloat(this.price.p).toFixed(2)
      }
    },
    handleMessage(msg) {
      this.trackedStreams.push({name: msg.s, price: msg.c})
       console.log(this.trackedStreams);
    }

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
