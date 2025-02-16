// 高阶函数之函数的n次重复应用
(function () {
    // 练习1.43 如果f是一个数值函数，n是一个正整数，我们可以构造f的n次重复应用，也就是说，这个函数在x的值应该是f（f（…(f(x))…））。
    // 举例说，如果f是函数x↦x+1，n次重复应用f就是函数x↦x+n。如果f是求数的平方的函数，n次重复应用f就求出其参数的2n次幂。
    // 请写一个函数，其输入是一个计算f的函数和一个正整数n，返回的是计算f的n次重复应用的那个函数。你的函数应该能以如下方式使用：[插图]
    // 提示：你可能发现，利用练习1.42的compose可能带来一些方便。

    // 迭代实现
    function repeated(f, n) {
        function iter(f, i, result) {
            return i === 0
                ? undefined
                : i === 1
                    ? f(result)
                    : iter(f, i - 1, f(result));
        }

        return x => iter(f, n, x);
    }

    (function () {
        console.log(repeated(x => x * x, 2)(5));
        console.log(repeated(x => x * x, 1)(5));
        console.log(repeated(x => x * x, 0)(5));
    })()

    function compose(f, g) {
        return x => f(g(x));
    }

    // 使用compose简化；递归形式
    function repeated2(f, n) {
        return n === 0
            ? x => undefined
            : n === 1
                ? f
                : compose(f, repeated2(f, n - 1));
    }

    (function () {
        console.log(repeated2(x => x * x, 2)(5));
        console.log(repeated2(x => x * x, 1)(5));
        console.log(repeated2(x => x * x, 0)(5));
    })()
})()
