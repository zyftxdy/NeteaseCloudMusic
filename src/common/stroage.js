import storage from 'good-storage'

const HISTORY_KEY="_history";
const HISTORY_LENGTH = 10;
const PLAYHISTORY_KEY = '_playHistory';

const FAVORITE_KEY = '_favorite';

function insertArray(arr,val,fun,maxLength) {
    const index = arr.findIndex(fun);
    if(index === 0){
        return
    }
    if(index > 0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLength && arr.length>maxLength){
        arr.pop();
    }
}

function delParam(arr,val) {
    const index = arr.findIndex(val);
    if(index > -1){
        arr.splice(index,1)
    }
}

//搜索记录
export function setHistory(value) {
    let historys = storage.get(HISTORY_KEY,[]);
    insertArray(historys,value,(item)=>{
        return item === value
    },HISTORY_LENGTH)
    storage.set(HISTORY_KEY,historys);
    return historys;
}

//得到搜索记录
export function getHistory(){
    return storage.get(HISTORY_KEY,[]);
}

//删除历史记录
export function deleteHistory(){
    storage.remove(HISTORY_KEY);
    return [];
}

//最近播放
export function setPlayHistory(value){
    let plays = storage.get(PLAYHISTORY_KEY,[]);
    insertArray(plays,value,(item)=>{
        return item.id === value.id
    })
    storage.set(PLAYHISTORY_KEY,plays);
    return plays;
}

//得到最近播放
export function getPlayHistory(){
    return storage.get(PLAYHISTORY_KEY,[]);
}

//根据单曲删除最近播放
export function deletePlayHistory(value){
    let plays = storage.get(PLAYHISTORY_KEY,[]);
    delParam(plays,(item)=>{
        return item.id === value.id
    });
    storage.set(PLAYHISTORY_KEY,plays);
    return plays;
}

//我的收藏
export function setFavorite(value){
    let favorites = storage.get(FAVORITE_KEY,[]);
    insertArray(favorites,value,(item)=>{
        return item.id === value.id
    })
    storage.set(FAVORITE_KEY,favorites);   
    return favorites;
}

//我的收藏
export function getFavorite(){
    return storage.get(FAVORITE_KEY,[]);
}

//根据单曲删除我的收藏
export function deleteFavorite(value){
    let favorites = storage.get(FAVORITE_KEY,[]);
    delParam(favorites,(item)=>{
        return item.id === value.id
    });
    storage.set(FAVORITE_KEY,favorites);
    return favorites;
}