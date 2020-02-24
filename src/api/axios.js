import axios from 'axios';


export function api(config) {
    return new Promise((resolve,reject) => {
        const instance = axios.create({
            baseURL:'http://localhost:3000',
            timeout:10000
        })

        //拦截器
        //1.请求拦截
        instance.interceptors.request.use(config =>{
            //console.log(config); 
            return config
        },err =>{
            console.log(err);
            return err 
        });
        //2.响应拦截
        instance.interceptors.response.use(res =>{
            //console.log(res);
            return res.data
        },err =>{
            console.log(err)
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求错误'
                        break
                    case 401:
                        err.message = '未授权的访问'
                        break
                }
            }
            return err
        })

        // 2.传入对象进行网络请求
		instance(config).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
    })
}