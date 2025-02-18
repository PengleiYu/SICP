// 丘奇计数：使用函数来表示数字，并可以运算
(function () {
    // 练习2.6 如果觉得序对可以只用函数表示还不够令人震惊，那么请考虑，在一个可以对函数做各种操作的语言里，我们完全可以没有数（至少在只考虑非负整数的情况下），
    // 以下面的方式实现0和加一操作：
    const zero = f => x => x;

    function add_1(n) {
        return f => x => f(n(f)(x));
    }

    // 这一表示形式被称为Church计数，这个名字来源于其发明人——逻辑学家Alonzo Church。λ演算也是Church的发明。
    // 请直接声明one和two（不用zero和add_1）。（提示：请利用代换去求值add_1(zero)。）请给出加法函数+的一个直接声明（不通过反复应用add_1）。
    const one = f => x => f(x);
    const two = f => x => f(f(x));

    function add(a, b) {
        return f => x => a(f)(b(f)(x));
    }

    // 验证这些数字的正确性
    (function () {
        // 将柯西计数转为数字
        function toNumber(n) {
            return n(x => x + 1)(0);
        }

        console.log(toNumber(zero));
        console.log(toNumber(one));
        console.log(toNumber(two));
        console.log(toNumber(add(one, zero)));
        console.log(toNumber(add(one, two)));
        console.log(toNumber(add(two, two)));

        // 柯西计数转为星号
        function toStar(n) {
            return n(x => x + '*')('');
        }

        console.log(toStar(zero));
        console.log(toStar(one));
        console.log(toStar(two));
        console.log(toStar(add(one, zero)));
        console.log(toStar(add(one, two)));
        console.log(toStar(add(two, two)));
    })();
})()
