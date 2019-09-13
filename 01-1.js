// ES5 Function Constructor
function Person(name) {
  this.name = name;
}

function Student(name, studentId) {
  Person.call(this, name);
  this.studentId = studentId;
}

Student.prototype.show = function() {
  return `${this.studentId}: ${this.name}`;
};

const student1 = new Student('Daniel', 1);
const student2 = new Student('Maria', 2);

console.log(student1.show()); // `1: Daniel`
console.log(student2.show()); // `2: Maria`
