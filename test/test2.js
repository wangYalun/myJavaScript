const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul>heheheh</div>';
const obj = {
    "tag": "div",
    "children": [
        "Directory", {
            "tag": "ul",
            "children": [
                {
                    "tag": "li",
                    "children": [
                        "Apple"
                    ]
                },
                {
                    "tag": "li",
                    "children": [
                        "Orange"
                    ]
                }
            ]
        }
    ]
};

// Convert html to object.
const tagReg = /<[^<>]+>|\w+/g;
const htmlArr = html.match(tagReg);
// const htmlArr = [
//     '<div>',
//     'Directory',
//     '<ul>',
//     '<div>',
//     'Apple',
//     '</div>',
//     '<div>',
//     'Orange',
//     '</div>',
//     '</ul>',
//     '</div>']
// console.log(htmlArr);

const obj2 = convertHTMLArrToObj(htmlArr);
console.log(obj2);
console.log(JSON.stringify(obj2));
// let htmlChild = null;
// while (htmlChild = htmlArr.shift()) {
//     if (/<[^\/<>]+>/.test(htmlChild)) {
//         console.log(htmlChild, "startTag");
//         // let currentTag = {
//         //     "tag": htmlChild,
//         //     "children": []
//         // }

//         // // console.log(currentTag);
//         // process(currentTag);

//         // if (parentTag) {
//         //     parentTag.children.push(currentTag);
//         // } else {
//         //     obj = currentTag;
//         //     obj.children.push(currentTag);
//         // }
//         //tagStack.push(htmlChild);

//         // 如果是结束标签，则出栈
//     } else if (/<\/[^\/<>]+>/.test(htmlChild)) {
//         console.log(htmlChild, 'endTag');
//         //tagStack.pop();
//         // 文本节点
//     } else {
//         console.log(htmlChild, "text")
//         // parentTag.children.push(htmlChild);
//         // process(parentTag);
//     }
// }


function convertHTMLArrToObj(htmlArr) {
    // console.log(htmlArr);
    let obj = null;
    const tagStack = [];

    process();

    function process() {
        let htmlChild = htmlArr.shift();
        console.log(htmlChild);
        if (htmlChild == null) {
            return;
        }
        // 如果是开始标签，则入栈
        if (/<[^\/<>]+>/.test(htmlChild)) {

            let currentTag = {
                "tag": htmlChild,
                "children": []
            }

            if (tagStack.length) {
                tagStack[tagStack.length - 1].children.push(currentTag);
            }

            tagStack.push(currentTag);

            process();


            // 如果是结束标签，则出栈
        } else if (/<\/[^\/<>]+>/.test(htmlChild)) {
            // console.log(htmlChild);
            obj = tagStack.pop();
            process();
            // 文本节点
        } else {
            const last = tagStack.pop();
            last.children.push(htmlChild);
            tagStack.push(last);
            // parentTag.children.push(htmlChild);
            process();
        }
    }

    return obj;


}

/**
 * 实现一个洋葱模型
 */

const arr = [
    () => { console.log(1) },
    () => { console.log(2) },
    () => { console.log(3) },
]

function onion(arr, isNotOrder) {
    arr = arr.map(f => {
        return (next) => {
            if (isNotOrder) {
                next()
                f();
            } else {
                f();
                next();
            }

        }
    })
    return function () {
        run(0);
        function run(index) {
            const fn = arr[index];
            if (typeof fn === 'function') {
                fn(function next() {
                    run(index + 1);
                })
            }
        }
    }
}
const fun = onion(arr, true);
fun();
