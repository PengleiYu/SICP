import {math_pow} from "sicp";
// 用乘积2^a·3^b来表示a、b的pair
(function () {
    // 练习2.5 请证明，我们可以只用整数和算术运算，用乘积2^a·3^b对应的整数表示非负整数a和b的序对。请给出对应的函数pair、head和tail的声明。
    function pair(x, y) {
        return math_pow(2, x) * math_pow(3, y);
    }

    function head(z) {
        function iter(a, cnt) {
            return a % 2 !== 0
                ? cnt
                : iter(a / 2, cnt + 1);
        }

        return iter(z, 0);
    }

    function tail(z) {
        function iter(a, cnt) {
            return a % 3 !== 0
                ? cnt
                : iter(a / 3, cnt + 1);
        }

        return iter(z, 0);
    }

    (function () {
        const p = pair(1, 2);
        console.log(head(p), tail(p));
        const p2 = pair(p, 3);
        console.log(head(head(p2)), tail(head(p2)), tail(p2));
        const p3 = pair(10, 11);
        console.log(head(p3), tail(p3));
    })()
})()
