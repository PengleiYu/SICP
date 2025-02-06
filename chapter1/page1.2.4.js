// 1.2.4 求幂
(function () {
    // 如果再利用下面规则，我们就可以借助连续求平方的方法，完成一般的乘幂计算了：
    // b^n=b^(n/2)^2    如果n是偶数
    // b^n=b·b^(n-1)    如果n是奇数

    function is_even(n) {
        return n % 2 === 0;
    }

    function square(x) {
        return Math.pow(x, 2);
    }

    // 快速求幂；若指数为奇数，则提出一个底数，将指数变为偶数；若指数为偶数则指数折半改为平方
    function fast_exp(b, n) {
        return n === 0
            ? 1
            : is_even(n)
                ? square(fast_exp(b, n / 2)) // 这里保证了n被2整除
                : b * fast_exp(b, n - 1);
    }

    // 默认求幂
    function exp(b, n) {
        function iter(product, count) {
            return count === 0
                ? product
                : iter(product * b, count - 1);
        }

        return iter(1, n)
    }

    function cost(f) {
        let start = Date.now();
        let result = f();
        console.log(`cost ${Date.now() - start}`);
        return result;
    }

    const b = 3, n = 5_000;
    // 电脑速度太快，耗时都是0ms
    console.log(`fastExp: ${b}^${n}=${cost(() => fast_exp(b, n))}`)
    console.log(`exp    : ${b}^${n}=${cost(() => exp(b, n))}`)
})()
