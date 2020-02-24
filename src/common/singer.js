export class Singer{
    constructor(itemInfo){
        this.id = itemInfo.id;
        this.name = itemInfo.name;
        this.picUrl = itemInfo.img1v1Url;
        this.alias = itemInfo.alias.join('/')
    }
}