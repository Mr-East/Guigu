import request from "../../../utils/request";
import type { TradeMarkResponseData,TradeMark } from "./type";
enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/",
    ADD_TRADEMARK_URL='/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL='/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL='/admin/product/baseTrademark/remove/'
}

export const  reqGetTradeMarkList = (limit:number,page:number) => request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`/${page}/${limit}`)

export const reqUpdateorAddTradeMark = (data:TradeMark)=>{
    if(data.id){
       return request.post(API.UPDATE_TRADEMARK_URL,data)
    }else{
       return  request.post(API.ADD_TRADEMARK_URL,data)
    }   
}

export const reqDeleteTradeMark = (id:number)=>request.delete(API.DELETE_TRADEMARK_URL+`${id}`)