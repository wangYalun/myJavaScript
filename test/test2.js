const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>';
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
console.log(htmlArr);

const obj2 = convertHTMLArrToObj(htmlArr);
console.log(obj2);
function convertHTMLArrToObj(htmlArr) {
    let htmlChild = htmlArr.shift();

    if (htmlChild == null) {
        return;
    }

    if (/<[^<>]+>/.test(htmlChild)) {
        htmlArr.pop();
        return {
            "tag": htmlChild,
            "children": convertHTMLArrToObj(htmlArr)
        }
    }

    const children = [];
    const htmlChild2 = htmlArr.shift();
    console.log(htmlChild2);
    while (htmlChild2 != null) {
        if (/<[^<>]+>/.test(htmlChild2)) {
            htmlArr.pop();
            children.push({
                "tag": htmlChild,
                "children": convertHTMLArrToObj(htmlArr)
            })
        } else {
            children.push(htmlChild2)
        }
    }
    return children;
}
