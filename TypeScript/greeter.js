/**
 * 编译代码
 *
 * $ tsc greeter.ts
 */
/**
 * 类型注释
 */
(function () {
    function greeter(person) {
        return "Hello, " + person;
    }
    var user = [1, 2, 3, 4];
    console.log(greeter(user));
})();
/**
 * 接口
 */
(function () {
    function greeter(person) {
        return person.firstName + " " + person.lastName;
    }
    var user = { firstName: "Allen", lastName: "wang" };
    console.log(greeter(user));
})();
/**
 * 类
 */
(function () {
    var Student = /** @class */ (function () {
        function Student(firstName, middleInitial, lastName) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
        return Student;
    }());
    function greeter(person) {
        return person.firstName + " " + person.lastName;
    }
    var user = new Student("wang", "yalun", "allen");
})();
