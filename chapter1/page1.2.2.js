// 树形递归
(function () {
    // 每次调用产生两次递归调用，形成树形递归
    function fib1(n) {
        return n === 0
            ? 0
            : n === 1
                ? 1
                : fib1(n - 1) + fib1(n - 2)
    }

    // 改为线性迭代
    function fib2(n) {
        function fib_iter(a, b, count) {
            return count === 0
                ? b
                : fib_iter(a + b, a, count - 1)
        }

        return fib_iter(1, 0, n)
    }

    console.log(fib1(10))
    console.log(fib2(10))

    // 换零钱，树形递归的应用
    function count_change(amount) {
        // 假设零钱种类已按币值排序，
        function first_denomination(kinds_of_coins) {
            return kinds_of_coins === 1 ? 1
                : kinds_of_coins === 2 ? 5
                    : kinds_of_coins === 3 ? 10
                        : kinds_of_coins === 4 ? 25
                            : kinds_of_coins === 5 ? 50
                                : 0;
        }

        function cc(amount, kinds_of_coins) {
            return amount === 0
                ? 1
                : amount < 0 || kinds_of_coins === 0
                    ? 0
                    //不使用第一种零钱
                    : cc(amount, kinds_of_coins - 1)
                    //至少使用一个第一种零钱
                    + cc(amount - first_denomination(kinds_of_coins), kinds_of_coins)
        }

        return cc(amount, 5)
    }

    console.log(count_change(100))
})()