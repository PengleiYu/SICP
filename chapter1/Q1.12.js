(function () {
    // 练习1.12 下面的数值模式称为帕斯卡三角形：
    // 三角形两个斜边上的数都是1，内部的每个数是位于它上面的两个数之和[2]。
    // 请写一个函数，它通过一个递归计算过程计算帕斯卡三角形。

    function pascal(n) {
        // 递归形式
        function pascal_value(i, j) {
            return j === 0 || j === i
                ? 1
                : pascal_value(i - 1, j - 1) + pascal_value(i - 1, j);
        }

        let arr = Array(n + 1);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = pascal_value(n, i);
        }
        return arr;
        // 迭代形式似乎不好实现，需要数组作为参数？
    }

    console.log(pascal(1))
    console.log(pascal(2))
    console.log(pascal(3))
    console.log(pascal(4))
    console.log(pascal(5))
})()