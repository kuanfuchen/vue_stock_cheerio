<template>
  <div class="container">
    <div class="grid grid-cols-2 gap-2">
      <div class="recentStockIndexTable">
        <TodayStock class="border-2 rounded border-zinc-300 px-3 py-3" :recentStock="todayStockIndex"></TodayStock>
      </div>
      <div class="card" >
        <div class="">
          <canvas id="stockLinePlot"></canvas>
        </div>
        <div class="" style="height:200px;">
          <canvas id="stockBarPlot"></canvas>
        </div>
      </div>
      <div class="recentStockIndexTable">
        
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Subject, takeUntil } from 'rxjs';
  import { stockData, /* getStockData, responseStockDateAllInfo */} from "../utils/Fetch_Stock";
  import {ref, reactive, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import TodayStock from './TodayStock.vue';
  const todayStockIndex: array = ref([]);
  const recentStockIndex: array = reactive([]);
  const comSubject$:array = new Subject([]);
  const getStockInfo = () => stockData.getStockData();
  const allDate:array = [];
  // const allStockIndex:object = {
  //   shindex:[],
  //   tradingVolumn:[]
  // };
  const allStockShindex:array = [];
  const all_TradingVolumn:array = [];
  const stockShindexConfigData:object = {
    labels:allDate,
    datasets:[{
      // type: 'line',
      // axis: 'y',
      label: '股市指數',
      // backgroundColor: "#0000",
      borderColor: "rgb(45, 212, 191)",
      fill: false,
      data:allStockShindex,
      tension:0.1
    },]
  };
  const tradingVolumnConfigData:object={
    labels:allDate,
    datasets:[{
      label: '交易量',
      // borderColor: "rgb(45, 212, 191)",
      backgroundColor: "#3b82f6",
      fill: false,
      data:all_TradingVolumn,
    },]
  };
  const configLine:object = {
    type:'line',
    data:stockShindexConfigData,
    options:{
      responsive:true,
      scales: {
        y: {
          stacked: true
        }
      }
    }
  };
  const configBar:object = {
    type:'bar',
    fill:false,
    data:tradingVolumnConfigData
  };
  stockData.responseStockDateAllInfo$.pipe(takeUntil(comSubject$)).subscribe((stockInfo: object)=>{
    console.log(stockInfo, 'stockInfo')
    organizeStockPerDayData(stockInfo.data)
  });
  const organizeStockPerDayData:void = (stockInfo:array)=>{
    console.log(stockInfo, 'stockInfo');
    for(let i = 0 ; stockInfo.length > i ; i++){
      if( i === 0 ){
        const stockTodayIndex={ 成交均價: "12.9",成交均張: "2.8",成交張數: "5,556,554",成交筆數:"2,001,037",
        成交金額:"2,580.21",指數:"16452.73",振幅:"0.59%",昨收:"16440.91",最低價:"16382.40",最高價:"16479.35",漲跌:"+11.82",
        漲跌幅:"+0.07%",融券餘額:"307,805",融資餘額:"2,266.53",開盤價:"16416.54"};
        todayStockIndex.value = stockTodayIndex;
      }
      // if(i === 0) todayStockIndex.value = stockInfo[i].stockTodayIndex;
      if( i > 0 ){
        let tradingVol;
        if(stockInfo[i].tradingVol){
          const removeDot:array = stockInfo[i].tradingVol.split(',');
          tradingVol = removeDot.join('');
        }
        recentStockIndex.push(stockInfo[i]);
        allDate.unshift(stockInfo[i].date);
        allStockShindex.unshift(stockInfo[i].stock_points);
        // all_TradingVolumn.unshift(stockInfo[i].tradingVol);
        all_TradingVolumn.unshift(tradingVol);
      }
    }
    console.log(todayStockIndex.value)
    console.log(recentStockIndex);
    drawStockPlot()
  }
  const drawStockPlot = () => {
    const stockLineID:any = document.getElementById('stockLinePlot');
    const stockBarID:any = document.getElementById('stockBarPlot');
    new Chart(stockLineID, configLine);
    new Chart(stockBarID, configBar)
  };
  onMounted(async() => {
    await getStockInfo();
  })
</script>
<style>
  .container{
    width:80vw;
  }
  .recentStockIndexTable{
    margin-top: 5px;
    height:400px;
    overflow-y:hidden;
  }
</style>