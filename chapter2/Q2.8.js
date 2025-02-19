import {display_interval, make_interval, sub_interval} from "./interval.js";


// 区间的减法
(function () {

    // 练习2.8 请通过类似于Alyssa的推理，说明应该怎样计算两个区间的差。请声明相应的减法函数sub_interval。


    (function () {
        const interval1 = make_interval(1, 2);
        const interval2 = make_interval(3, 4);
        display_interval(interval1);
        display_interval(interval2);
        display_interval(sub_interval(interval1, interval2));
        display_interval(sub_interval(interval2, interval1));
    })();
})()
