// 1.2.5 GCD算法增长的阶为log(n)
(function () {
    function gcd(a, b) {
        return b === 0
            ? a
            : gcd(b, a % b);
    }

    // Lamé定理：如果欧几里得算法计算出一对整数的GCD需要用k步，那么这对数中较小的那个数必然大于或等于第k个斐波那契数

    function gcd_steps(arr) {
        let steps = 0;

        function gcd(a, b) {
            steps++;
            return b === 0
                ? a
                : gcd(b, a % b);
        }

        let result = gcd(arr[0], arr[1]);
        // console.log(`gcd(${arr}) result=${result}`)
        return steps;
    }

    function fib(n) {
        // 迭代函数的不变量为：定义k=n-count,则a=fib(k+1),b=fib(k);
        function fib_iter(a, b, count) {
            return count === 0
                ? b
                : fib_iter(a + b, a, count - 1)
        }

        return fib_iter(1, 0, n)
    }

    let arr = [
        [4, 4],
        [10, 2],
        [10, 5],
        [88, 56],
        // 最坏情况出现在输入为连续的斐波那契数时，此时每一步的余数正好符合斐波那契数列的递推关系，从而使得算法需要的步骤达到最大。
        [1, 1],
        [2, 1],
        [3, 2],
        [5, 3],
        [8, 5],
    ]
    // 令n作为函数输入的两个数中较小的那个，如果计算过程需要k步，步数k的增长就是n的对数（对数的底是ϕ）。这样，算法增长的阶就是Θ(log n)。
    arr.forEach(value => {
        let steps = gcd_steps(value);
        let fib_steps = fib(steps);
        let min = Math.min(value[0], value[1]);
        console.log(`gcd(${value}) steps=${steps}, min=${min},fib=${fib_steps}`)
    })
})()