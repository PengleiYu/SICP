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
        // 迭代函数的不变量为：定义k=n-count,则a=fib(k+1),b=fib(k);
        function fib_iter(a, b, count) {
            return count === 0
                ? b
                : fib_iter(a + b, a, count - 1)
        }

        return fib_iter(1, 0, n)
    }

    console.log(fib1(10))
    console.log(fib2(10))

    // 我们有一些50美分、25美分、10美分、5美分和1美分的硬币，要把1美元换成零钱，一共有多少种不同的方式？
    // 更一般的问题是，给了任意数量的美元现金，我们能写出一个程序，计算出所有换零钱方式的数目吗？
    // 换零钱，树形递归的应用
    function count_change(amount) {
        function first_denomination(kinds_of_coins) {
            // 假设零钱种类已按币值排序，
            // let result = kinds_of_coins === 1 ? 1
            //     : kinds_of_coins === 2 ? 5
            //         : kinds_of_coins === 3 ? 10
            //             : kinds_of_coins === 4 ? 25
            //                 : kinds_of_coins === 5 ? 50
            //                     : 0;
            // 其实零钱顺序不重要，只要保持顺序固定即可
            const arr = [50, 5, 1, 10, 25,];
            let result = arr[kinds_of_coins - 1] ?? 0;
            console.log(`first_denomination(${kinds_of_coins}) return ${result}`)
            return result;
        }

        /**
         * 把总数为a的现金换成n种硬币的不同方式的数目等于
         * 现金a换成除去第一种硬币之外的所有其他硬币的不同方式数目
         * 加上现金a-d换成所有种类的硬币的不同方式数目，其中d是第一种硬币的币值
         *
         * @param amount{number}
         * @param kinds_of_coins{number}
         * @returns {number}
         */
        function cc(amount, kinds_of_coins) {
            console.log(`cc() called: amount=${amount},kinds_of_coins=${kinds_of_coins}`)
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
