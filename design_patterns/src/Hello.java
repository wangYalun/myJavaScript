
public class Hello {
    public static void main(String args[]) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        say(dog);
        say(cat);

        Parent foo = new Sun();

        foo.run();

    }

    public static void say(Animal animal) {
        animal.say();
    }
}

class Parent {
    public void a() {
        System.out.println("A");
    }

    public void run() {
        this.a();
    }
}

class Sun extends Parent {
    public void a() {
        System.out.println("sun a");
    }
}

abstract class Animal {
    abstract void say(); // 抽象方法
}

class Dog extends Animal {
    public void say() {
        System.out.println("wang wang");
    }
}

class Cat extends Animal {
    public void say() {
        System.out.println("miao miao");
    }
}