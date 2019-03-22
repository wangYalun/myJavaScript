//类型的一些基本写法
function fn(name: string): void {
    console.log(name)
}


fn("allen");

// declare 表示声明，没有具体实现
declare function fn2(name: string): void;

// fn2("allen");

/**
 * 接口
 */

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}



function createSquare(config: SquareConfig): { color: string, area: number } {
    return {
        color: "red",
        area: 100
    }
}

let mySquare = createSquare({ color: "yellow", width: 100 });

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
}

mySearch("allen", "len");

// 可索引的类型

interface StringArray {
    [index: number]: number
}

let myArray: StringArray;

myArray = [1, 2, 32, 4];

// 类类型
interface ClockInterface {
    tick(): void;
}


interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

class DigitalClock implements ClockInterface {
    constructor(h: number, minute: number) {

    }
    tick() {
        console.log("beep beep");
    }
}

