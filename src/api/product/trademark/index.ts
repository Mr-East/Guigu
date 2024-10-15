import request from "../../../utils/request";
import type { TradeMarkResponseData,TradeMark } from "./type";
enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/",
    ADD_TRADEMARK_URL='/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL='/admin/product/baseTrademark/update'
}

export const  reqGetTradeMarkList = (limit:number,page:number) => request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`/${page}/${limit}`)

export const reqUpdateTradeMark = (data:TradeMark)=>{
    if(data.id){
        
    }else{
        
    }
        
    
}