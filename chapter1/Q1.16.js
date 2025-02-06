(function () {
    // 练习1.16 请设计一个函数，它使用一系列的求平方，产生一个迭代的求幂计算过程，但是就像fast_expt那样只需要对数的步数。
    // （提示：请利用关系(bn/2)2=(b2)n/2，除了指数n和基数b之外，还应该维持一个附加的状态变量a，并定义好状态变换，使得从一个状态转到另一状态时乘积a·bn不变。
    // 在计算过程开始时令a取值1，并用计算过程结束时a的值作为回答。一般而言，定义一个不变量，要求它在状态之间保持不变，
    // 这一技术是思考迭代算法设计问题时的一种非常强有力的方法。）

    function is_even(n) {
        console.log(`is_even(${n})`)
        return n % 2 === 0;
    }

    function square(x) {
        console.log(`square(${x})`)
        return Math.pow(x, 2);
    }

    function fast_exp(b, n) {
        // 迭代设计的关键：不变量，这里的不变量是a*b^n
        function iter(a, b, n) {
            console.log(`iter(${a},${b},${n})`)
            return n === 0
                ? a
                : is_even(n)
                    // a*b^2^(n/2) = a*b^n
                    ? iter(a, square(b), n / 2)
                    // a*b*b^(n-1) = a*b^n
                    : iter(a * b, b, n - 1);
        }

        return iter(1, b, n);
    }

    console.log(fast_exp(2, 10))
})()
