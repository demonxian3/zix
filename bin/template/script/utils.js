class Utils {

    static setHost(host) {
        this.host = host;
    }

    static parse(reply){
        let text = typeof reply == 'object' ? reply.responseText : reply;
        let data = JSON.parse(text);
        return data;
    }

    static getFragment()
    {
        return location.hash.substring(1);
    }

    static getQueryString()
    {
        return  location.href.search();
    }

    static nativeAjax(method, pathinfo, data)
    {
        let option = {
            url: `${this.host}/${pathinfo}`,
            type: method,
            processData: false,
            contentType: false,
            async: false,
            complete: (xhr, data) => {
                if (xhr.status == 302) {
                    let reply = this.parse(xhr.responseText);
                    top.window.location.href = reply.data;
                    window.location = reply.data;
                    return false;
                }
            },
        }

        if (data) option.data = data;
        return $.ajax(option);
    }


    static syncAjax(method, pathinfo, data)
    {
        let option = {
            url: `${this.host}/${pathinfo}`,
            type: method,
            async: false,
            complete: (xhr, data) => {
                if (xhr.status == 302) {
                    let reply = this.parse(xhr.responseText);
                    top.window.location.href = reply.data;
                    window.location = reply.data;
                    return false;
                }
            },
        }

        if (data) option.data = data;
        return $.ajax(option);
    }

    static asyncAjax(method, pathinfo, data, callback)
    {

        let option = {
            url: `${this.host}/${pathinfo}`,
            type: method,
            async: true,
            complete: (xhr, data) => {
                if (xhr.status == 302) {
                    let reply = this.parse(xhr.responseText);
                    top.window.location.href = reply.data;
                    window.location = reply.data;
                    return false;
                }
            },
            success: callback,
        }

        if (data) option.data = data;

        $.ajax(option);
        return true;
    }

    //跳转页面
    static redirect(page){
        window.location = `${page}.html`;
        return true;
    }

    //时间错转日期
    static timeToDate(time) {
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }

    static getCurrentTime(){
        var t = new Date();
        var H = t.getHours()+"";
        var M = t.getMinutes()+"";
        var S = t.getSeconds()+"";
        var y = t.getFullYear();
        var m = t.getMonth()+"";
        var d = t.getDate()+"";

        if(H.length < 2)H = "0"+H;
        if(M.length < 2)M = "0"+M;
        if(S.length < 2)S = "0"+S;
        if(m.length < 2)m = "0"+m;
        if(d.length < 2)d = "0"+d;

        document.getElementById("time").innerHTML = H + ":" + M + ":" + S;
        document.getElementById("date").innerHTML = y + "-" + m + "-" + d;
    }


    static getRealPath(){
        var curWwwPath=window.document.location.href;
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        var localhostPaht=curWwwPath.substring(0,pos);
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        var realPath=localhostPaht+projectName;
        return realPath + "/"
    }

    static getDate(day) {
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
    }

    static doHandleMonth(month) {
        var m = month;
        if(month.toString().length == 1){
         m = "0" + month;
        }
        return m;
    }

}
