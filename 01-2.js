// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
  show() {
    return `${this.studentId}: ${this.name}`;
  }
}

const student1 = new Student('Daniel', 1);
const student2 = new Student('Maria', 2);

console.log(student1.show()); // `1: Daniel`
console.log(student2.show()); // `2: Maria`
