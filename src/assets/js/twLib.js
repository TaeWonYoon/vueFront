const numFormmat = { //넘버 포맷
    nfm(num) {
        return new Intl.NumberFormat().format(num);
    }
}

const statusVal = {
    stv(data, statusKey, statusVal) { //ex)  stv(item.deliverStatus,'U,O,E','배송준비,배송시작,배송완료') 
        let statusKeys = statusKey.split(","); // key
        let statusVals = statusVal.split(","); // value

        let i = 0;
        let dataArr = {};

        for (i; i < statusKeys.length; i++) {
            dataArr[statusKeys[i]] = statusVals[i]; // 원하는 key,val 배열에 담기
        }
        let dataVal = dataArr[data]; //val 출력

        return dataVal;
    }
}

const dateFormmat = { //날짜포맷
    dfm(date) {
        let result = "";
        if (date != null && date != "") { //널값은 유닉스 시간이 나오기 때문에 조건처리
            let now = new Date(date);
            let year = now.getFullYear() < 10 ? '0' + now.getFullYear() : now.getFullYear();
            let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
            let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
            result = year + '-' + month + '-' + day;
        }
        return result;
    }
}

const consoleData = { //json 파싱 콘솔  
    csl(name, arr) {
        console.log(name + " = " + JSON.stringify(arr));
    }
}

export default {
    install(Vue) {
        // Vue.config.globalProperties.$abcd = function(data) {
        //         alert(data);
        //     },
        Vue.config.globalProperties.$log = consoleData.csl; //콘솔
        Vue.config.globalProperties.$nfm = numFormmat.nfm; //넘버포맷
        Vue.config.globalProperties.$stv = statusVal.stv; //키 벨류 출력
        Vue.config.globalProperties.$dfm = dateFormmat.dfm; // 날짜 포맷
    }
}