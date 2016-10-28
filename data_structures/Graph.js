
//ES2015 写法

class Vertex {
    constructor(lable) {
        this.lable = lable;
    }
}
//邻接表 实现图
class Graph {
    constructor(v) {
        this.vertices = v;
        this.vertexList = [];
        this.edges = 0;
        this.adj = [];
        //标记是否被访问
        this.marked = [];
        //路径
        this.edgeTo = [];

        for (let i = 0; i < this.vertices; ++i) {
            this.adj[i] = [];
            this.adj[i].push("");
            this.marked[i] = false;
        }
    }
    //添加边
    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }
    //打印图
    showGraph() {
        for (let i = 0; i < this.vertices; ++i) {
            let str = "";
            str += i + " -> ";
            for (let j = 0; j < this.vertices; ++j) {
                if (this.adj[i][j] != undefined) {
                    str += this.adj[i][j] + " ";
                }
            }
            console.log(str);
        }
    }

    //深度优先搜索 depthFirstSearch
    dfs(v) {
        var it = this;
        this.marked[v] = true;
        if (this.adj[v] != undefined) {
            console.log('Visited vertex: ' + v);
            this.adj[v].forEach(function (item, index, array) {
                if (!it.marked[item]) {
                    it.dfs(item);
                }
            });
        }
    }

    //广度优先搜索 
    bfs(s) {
        var queue = [];
        this.marked[s] = true;
        queue.push(s);
        while (queue.length > 0) {
            var v = queue.shift();
            if (this.adj[v] != undefined) {
                console.log("Visited vertex: " + v);
                this.adj[v].forEach(function (item, index, array) {
                    if (!this.marked[item]) {
                        this.edgeTo[item] = v;
                        this.marked[item] = true;
                        queue.push(item);
                    }
                }, this);
            }

        }
    }
    //最短路径
    pathTo(v) {
        var source = 0;
        //确保这个顶点和0有连通。
        if (!this.hasPathTo(v)) {
            return undefined;
        }
        var path = [];
        for (let i = v; i != source; i = this.edgeTo[i]) {
            path.push(i);
        }
        path.push(source);
        return path;
    }

    hasPathTo(v) {
        return this.marked[v];
    }

    //拓扑排序
    topSort() {
        var stack = [];
        var visited = [];
        for (let i = 0; i < this.vertices; i++) {
            visited[i] = false;
        }
        for (let i = 0; i < stack.length; i++) {
            if (visited[i] == false) {
                this.topSortHelper(i, visited, stack);
            }
        }
        for (let i = 0; i < stack.length; i++) {
            if (stack[i] != undefined && stack[i] != false) {
                console.log(this.vertexList[stack[i]]);
            }
        }
    }

    topSortHelper(v, visited, stack) {
        visited[v] = true;
        this.adj[v].forEach(function (item, index, array) {
            if (!visited[item]) {
                this.topSortHelper(visited[item], visited, stack);
            }
        }, this);
        stack.push(v);
    }
}

//测试
//创建一个含有5个顶点的图
var g = new Graph(5);
//添加边
g.addEdge(0, 1);
g.addEdge(2, 3);
g.addEdge(1, 3);
g.addEdge(3, 4);
//g.addEdge(0,2);
g.showGraph();
//从0号顶点开始深度优先搜索
console.log(g.adj[1]);
//g.dfs(0);
console.log('广度优先搜索');
g.bfs(0);
var paths = g.pathTo(2);
console.log(paths);