// 函数作为返回值，观察多次应用的效果
(function () {
    function inc(x) {
        return x + 1;
    }

    // 练习1.41 请声明一个函数double，它以一个只有一个参数的函数为参数，返回另一个函数，后一函数将连续地应用原来的那个参数函数两次。
    // 例如，如果inc是一个给参数加1的函数，double(inc)将给参数加2。下面这个语句返回什么值：

    function double(f) {
        return x => f(f(x));
    }

    (function () {
        console.log('double(inc)(2)', double(inc)(2));
        // 结果为21，因为inc执行了2^2^2次，所以5+16=21
        console.log('double(double(double))(inc)(5)', double(double(double))(inc)(5));
    })()
})()
