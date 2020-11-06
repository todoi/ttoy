(function () {
    var regExp = /https?:\/\/weibo\.com/;
    if (!regExp.test(location.href)) {
        return;
    }
    if (!Number($CONFIG.islogin)) {
        alert("请先登录微博!");
        return;
    }
    try {
        if(!confirm('确定清空微博!!!')) return;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "//lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js";
        s.onload = function () {
            var scriptContainerId = "W_clear-feeds__" + new Date().getTime();
            var timer;
            var profileUrl =
                "//weibo.com/" +
                parent.$CONFIG.uid +
                "/profile?profile_ftype=1&is_all=1&ajaxpagelet=1&ajaxpagelet_v6=1";
            var feedsUrl =
                "//weibo.com/" +
                parent.$CONFIG.uid +
                "/profile?pids=Pl_Official_MyProfileFeed__20&profile_ftype=1&is_all=1&ajaxpagelet=1&ajaxpagelet_v6=1";
            function appendScriptContainer() {
                document.body.appendChild($("<div id=" + scriptContainerId + "></div>")[0]);
            }
            function deleteItem(mid) {
                // 档案娘助手 chrome 插件
                // https://chrome.google.com/webstore/detail/%E6%A1%A3%E6%A1%88%E5%A8%98%E5%8A%A9%E6%89%8B/abfopppplogcojgdcfhhffngkabbhifm
                // url: "https//api.weibo.com/2/statuses/user_timeline.json?source=209678993&count=20&trim_user=1&uid=" + $CONFIG.uid + "&page=" + page,
                return $.ajax({
                    url: "//weibo.com/aj/mblog/del?ajwvr=6",
                    type: "POST",
                    dataType: "json",
                    data: { mid: mid }
                })
                .done(function (ret) {
                    if (ret.code === '100000') {
                        var $feed = $("[mid=" + mid + "]");
                        if($feed.length) {
                            $feed.hide('slow', function() {
                                $feed.remove()
                            })
                        }
                        var count = $($(".tb_counter .W_f18")[2]).text();
                        count--;
                        $($(".tb_counter .W_f18")[2]).text(count);
                    }
                })
            }
            function getFeedNodes() {
                return $("[action-type=feed_list_item]");
            }
            function loadMore(url, cb) {
                // 点击全部按钮
                $.get(url)
                    .done(function (html) {
                        if (!$("div#" + scriptContainerId).length) {
                            appendScriptContainer();
                        }
                        $("#" + scriptContainerId).html(html);
                        timer = setTimeout(function () {
                            clearTimeout(timer);
                            cb();
                        }, 2000);
                    })
                    .fail(function (e) {
                        console.log(e);
                        alert("清空失败!请刷新页面后重试!");
                    });
            }
            function deleteFeeds() {
                var $feedNodes = getFeedNodes();
                var nodeLength = $feedNodes.length;
                var jobCounter = 0;
                var index = 0;
                var dtimer
                if (nodeLength === 0) {
                    return alert("清空微博成功!");
                }
                function loopDelete() {
                    dtimer = setTimeout(() => {
                        clearTimeout(dtimer)
                        const $feed = $feedNodes[index];
                        var mid = $($feed).attr("mid");
                        deleteItem(mid).always(function () {
                            jobCounter++;
                            // all ajax done
                            jobCounter === nodeLength && loadMore(feedsUrl, deleteFeeds);
                        });
                        index++;
                        index < nodeLength ? loopDelete() : null;
                    }, 1000)
                }
                loopDelete()
            }
            appendScriptContainer();
            loadMore(profileUrl, deleteFeeds);
        };
        s.onerror = function (e) {
            alert(e);
        };
        document.getElementsByTagName("head")[0].appendChild(s);
    } catch (e) {
        alert(e);
    }
})();
