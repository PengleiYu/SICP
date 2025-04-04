import {filter, head, is_undefined, pair, tail} from "sicp";

// 数据导向的一个系统设计
(function () {
    // 练习2.74 Insatiable事业公司是一个高度分散经营的联合公司，由一大批分布在世界各地的分支机构组成。
    // 公司的计算机设施已经通过一种非常巧妙的网络连接模式联为一体，使得从任何用户的角度看，整个网络就像一台计算机。
    // 当Insatiable公司的总经理第一次试图利用网络能力从各分支机构的文件提取管理信息时，她非常沮丧地发现，
    // 虽然各分支机构的文件都被实现为JavaScript里的数据结构，但是它们所用的数据结构各不相同。她立刻招来各个分支机构的经理，开了一个会，
    // 希望找到一种策略集成起这些文件，以满足公司总部的需要，同时又能保持各分支机构现有的自治状态。
    // 请说明可以如何用数据导向的程序设计技术实现一种策略。作为例子，假定每个分支机构的人事记录都保存在一个独立文件里，
    // 其中包含了一集以雇员的名字作为键值的记录。而有关集合的结构却由于分支机构的不同而不同。进一步说，
    // 每个雇员的记录本身又是一个集合（各分支机构所用的结构也不同）​，其中包含的信息也在一些作为键值的标识符之下，
    // 例如address和salary。特别地：
    function get(op, type) {
        return () => {
        }
    }

    function put(op, type, value) {
    }

    // a.请为公司总部实现一个get_record函数，使它能从指定的人事文件里提取出任何特定雇员的记录。这个函数应该能用于任何分支机构的文件。
    // 请说明各独立分支机构的文件应该具有怎样的构造。特别地，它们必须提供哪些类型信息？
    // 文件应当包含两个信息，1，机构名，2，获取记录的函数
    function make_file(department, file) {
        return pair(department, file);
    }

    function make_record(department, record) {
        return pair(department, record)
    }

    function type_of(data) {
        return head(data)
    }

    function content(data) {
        return tail(data)
    }

    function install_xx_department() {
        const department = "xx"

        function get_record(name, file) {
            const record = "xx_record";// 从文件中读取记录
            return make_record(department, record)
        }

        function get_salary(record) {
            let salary = "xx_salary";// 从record中读取薪金
            return salary
        }

        put("get_record", "xx", get_record)
        put("get_salary", "xx", get_salary)
    }

    function get_record(name, file) {
        return get("get_record", type_of(file))(name, content(file));
    }


    // b.请为公司总部实现一个get_salary函数，它能从任何分支机构的人事文件中获取某个特定雇员的薪金信息。为使这个操作能工作，这些记录应具有怎样的结构？
    // 记录也应当包含两个信息，1，机构名，2，获取薪金的函数
    function get_salary(record) {
        return get("get_salary", type_of(record))(content(record));
    }

    // c.请为公司总部实现一个函数find_employee_record，该函数需要针对特定的雇员名，到所有分支机构的文件去查找对应的记录，并返回找到的记录。
    // 假定这个函数的参数是一个雇员名和一个包含所有分支机构文件的表。
    function find_employee_record(employee_name, files) {
        return head(
            filter(
                file => !is_undefined(get_record(employee_name, file)),
                files))
    }

    // d.当Insatiable购并了一家新公司后，为了能把新增加的人事文件结合到中央系统中，必须对系统做哪些修改？
    // 只需要一个新的install函数即可，该函数安装新公司的get_record和get_salary函数
})();
