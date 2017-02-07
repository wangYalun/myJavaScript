
public class Hello{
    public static void main(String args[]){
        Dog dog=new Dog();
        Cat cat=new Cat();
        say(dog);
        say(cat);
    }

    public static void say(Animal animal){
        animal.say();
    }
}

abstract class Animal{
    abstract void say(); //抽象方法
}

class Dog extends Animal{
    public void say(){
        System.out.println("wang wang");
    }
}

class Cat extends Animal{
    public void say(){
        System.out.println("miao miao");
    }
}