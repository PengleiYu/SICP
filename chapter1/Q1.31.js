// 高阶函数之求积函数
(function () {
    // a.函数sum是可以用高阶函数表示的大量类似抽象中最简单的一个[插图]。
    // 请写一个类似的称为product的函数，它返回某个函数在给定范围中各个点上的值的乘积。

    // 递归形式
    function product(term, a, next, b) {
        return a > b
            ? 1
            : term(a) * product(term, next(a), next, b);
    }

    // 请说明如何利用product声明factorial。
    function factorial(n) {
        function identity(x) {
            return x;
        }

        function inc(x) {
            return x + 1;
        }

        return product(identity, 1, inc, n)
    }

    console.log(factorial(1))
    console.log(factorial(2))
    console.log(factorial(3))
    console.log(factorial(4))
    console.log(factorial(5))
    console.log(factorial(6))

    // 再请根据下面公式计算π的近似值[插图]：
    // pi/4 = 2*4*4*6*6*8.../3*3*5*5*7*7...

    function pi_product(a, b) {
        function term(x) {
            return (x - 1) * (x + 1) / (x * x);
        }

        function next(x) {
            return x + 2;
        }

        return 4 * product(term, a, next, b)
    }

    console.log(pi_product(3, 10))
    console.log(pi_product(3, 100))
    console.log(pi_product(3, 1000))
    console.log(pi_product(3, 10000))
    // console.log(pi_product(3, 100000))// 栈溢出了


    // b.如果你的product函数生成的是一个递归计算过程，那么请写一个生成迭代计算过程的函数。
    // 如果它生成迭代计算过程，请写一个生成递归计算过程的函数。


    // 迭代形式
    function product2(term, a, next, b) {
        function iter(a, result) {
            return a > b
                ? result
                : iter(next(a), result * term(a))
        }

        return iter(a, 1)
    }

    function pi_product2(a, b) {
        function term(x) {
            return (x - 1) * (x + 1) / (x * x);
        }

        function next(x) {
            return x + 2;
        }

        return 4 * product2(term, a, next, b)
    }

    console.log(pi_product2(3, 10))
    console.log(pi_product2(3, 100))
    console.log(pi_product2(3, 1000))
    console.log(pi_product2(3, 10000))
    // console.log(pi_product2(3, 100000))// 栈溢出了,这说明node中没有尾递归优化
})()
