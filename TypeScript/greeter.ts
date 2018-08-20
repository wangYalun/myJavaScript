
/**
 * 编译代码
 * 
 * $ tsc greeter.ts 
 */

/**
 * 类型注释
 */
(function () {
    function greeter(person: string) {
        return "Hello, " + person;
    }
    // var user = [1, 2, 3, 4];
    var user = "Allen";


    console.log(greeter(user));

})();



/**
 * 接口
 */
(function () {
    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return person.firstName + " " + person.lastName;
    }

    var user = { firstName: "Allen", lastName: "wang" };

    console.log(greeter(user));
})();

/**
 * 类
 */
(function () {
    class Student {
        fullName: string;
        constructor(public firstName, public middleInitial, public lastName) {
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
    }

    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return person.firstName + " " + person.lastName;
    }

    var user = new Student("wang", "yalun", "allen");
})();






