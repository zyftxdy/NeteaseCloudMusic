
//推荐新歌
export class  Song{
    constructor(itemInfo){
        this.id = itemInfo.id;
        this.image = itemInfo.picUrl;
        this.name = itemInfo.name;
        this.singer = singerName(itemInfo.song.artists);
    }
} 

//搜索歌曲
export class SearchSong{
    constructor(itemInfo){
        this.id = itemInfo.id;
        this.name = itemInfo.name;
        this.singer = singerName(itemInfo.artists);
        this.album = itemInfo.album.name;
    }
}

//推荐电台节目
export class Program{
    constructor(itemInfo){
        this.id = itemInfo.mainSong.id;
        this.image = itemInfo.coverUrl;
        this.desc = itemInfo.description;
        this.singer = itemInfo.dj.brand;
        this.name = itemInfo.mainSong.name;
    }
}

function singerName (arr) {
    let name = []
    name = arr.map((item) => {
      // console.log(arr)
      return item.name
    })
  
    return name.join('/')
}