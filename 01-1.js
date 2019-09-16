// ES5 Function Constructor
function Person(name) {
  this.name = name;
}

function Student(name, studentId) {
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

  Person.call(this, name);
  this.studentId = idGenerator();
}

Student.prototype.show = function() {
  return `${this.studentId}: ${this.name}`;
};

const student1 = new Student('Daniel');
const student2 = new Student('Maria');

console.log(student1.show()); // `studentId: Daniel`
console.log(student2.show()); // `studentId: Maria`
