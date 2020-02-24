import {mapActions,mapMutations,mapGetters} from 'vuex'

import {getSongDetail} from 'api/search'

export const savePlayList = {
    methods:{
        //播放单曲
        saveSong(listItem){
            let song = {};
            song.id = listItem.id;
            song.name = listItem.name;
            if(listItem.singer){
                song.singer = listItem.singer;
            }else{
                song.singer = this.showName(listItem.ar);
            }
            if(listItem.image){
                song.image = listItem.image;
            }else{
                getSongDetail(song.id).then(res=>{
                    song.image = res.songs[0].al.picUrl;
                })
            }       
            this.insertSong(song);
            this.addPlay(song);
        },

        //(歌单歌手详情)全部播放
        playSongs(listItem){
            let list = [];
            
            for(let i =0;i<listItem.length;i++){
                let song = {};
                song.id= listItem[i].id;
                song.name = listItem[i].name;
                song.singer = this.showName(listItem[i].ar);
                song.image = listItem[i].al.picUrl; 
                list.push(song);
            }

            this.savePlayLists(list);
        },

        showName(value){
            let name = []
            name = value.map((item) => {
            // console.log(arr)
            return item.name
            })
            return name.join('/')
        },
        ...mapActions({
            insertSong:'insertSong',
            addPlay:'addPlay'
            
        }),
        ...mapMutations({
            savePlayLists:'savePlayLists'
        })
    }
}

export const Playing = {
    computed:{
        ...mapGetters(['getPlayList'])
    }
}