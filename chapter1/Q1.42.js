// 高阶函数之：函数的复合
(function () {
    // 练习1.42 令f和g是两个单参数的函数，f在g之后的复合定义为函数x↦f(g(x))。
    // 请声明一个函数compose实现函数复合。例如，如果inc是将参数加1的函数，那么就有：
    // compose(square, inc)(6)

    function compose(f, g) {
        return x => f(g(x));
    }

    (function () {
        function inc(x) {
            return x + 1;
        }

        function square(x) {
            return x * x;
        }

        console.log(compose(square, inc)(6));
    })()
})()
