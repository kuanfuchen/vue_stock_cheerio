import {Subject, Observable} from 'rxjs';
import axios from 'axios';
const _responseStockDateAllInfo$ = new Subject<object>();
const url:string = "http://127.0.0.1:3000/getCheerio/socket";
const getStockData:void = () => {
  axios({
    url,
    method:'get',
  }).then((response)=>{
    _responseStockDateAllInfo$.next(response.data)
  }).catch((err) => console.log(err));
};
// const getStockData:void = ()=>{
//   fetch(url).then((response)=>{
//     // console.log(response);
//     _responseStockDateAllInfo$.next(response.json())
//   });
// }
export const stockData:any = {
  getStockData,
  responseStockDateAllInfo$:_responseStockDateAllInfo$.asObservable(),
}