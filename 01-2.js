// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    //  added id generator for studentId
    const idGenerator = () => {
      return (
        Date.now()
          .toString(32)
          .substr(-4) +
        '-' +
        Math.random()
          .toString(32)
          .substr(2)
      );
    };

    super(name);
    this.studentId = idGenerator();
  }
  show() {
    return `${this.studentId}: ${this.name}`;
  }
}

const student1 = new Student('Daniel');
const student2 = new Student('Maria');

console.log(student1.show()); // `studentId: Daniel`
console.log(student2.show()); // `studentId: Maria`
