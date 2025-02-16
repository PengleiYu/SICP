// 高阶函数之n次平滑函数
(function () {
    // 练习1.44平滑一个函数的思想是信号处理中的一个重要概念。如果f是函数，dx是某个很小的数值，那么f的平滑版本也是函数，
    // 它在点x的值就是f(x-d x)、f(x)和f(x+d x)的平均值。请写一个函数smooth，其参数是一个计算f的函数，返回f经过平滑后的那个函数。
    // 有时我们可能发现，重复地平滑一个函数，得到经过n次平滑的函数（也就是说，对平滑后的函数再做平滑，等等）也很有价值。
    // 请说明怎样利用smooth和练习1.43的repeated，构造出能对给定的函数做n次平滑的函数。

    const dx = 0.001;

    function smooth(f) {
        return x => (f(x - dx) + f(x) + f(x + dx)) / 3;
    }

    function test(f) {
        let arr = Array.from({length: 10}, (v, k) => k);
        arr.forEach(value => {
            let r = f(value);
            console.log(value, '->', r);
        })
    }

    (function () {
        function f(x) {
            return x * x;
        }

        console.log('原函数');
        test(f);
        console.log("平滑后函数");
        test(smooth(f));
    })()

    function smooth_n(f, n) {
        function repeated(f, n) {
            function iter(f, i, result) {
                return i === 0
                    ? result
                    : iter(f, i - 1, f(result));
            }

            return x => iter(f, n, x);
        }

        // 注意：这里不要写成repeated(smooth(f), n)，这样会导致f被执行n次
        return repeated(smooth, n)(f);
    }

    (function () {
        function f(x) {
            return x * x;
        }

        console.log('smooth_n：原函数')
        test(f);
        console.log('smooth_n：平滑1次后函数')
        test(smooth_n(f, 1));
        console.log('smooth_n：平滑2次后函数')
        test(smooth_n(f, 2));
    })()
})()
