// ***ES2015+**
class Person {
  constructor(firstName, lastName) {
    this.changes = [];
    this.firstName = firstName;
    this.lastName = lastName;
  }
  showName() {
    return `${this.firstName} ${this.lastName}`;
  }
  addChangesRecord(fieldName, oldValue, newValue) {
    this.changes.push(
      `${new Date().toUTCString()}: ${fieldName} was changed from ${oldValue} to ${newValue}`
    );
  }
  changeName(newFirstName, newLastName) {
    this.addChangesRecord(
      `Name`,
      `${this.firstName} ${this.lastName}`,
      `${newFirstName} ${newLastName}`
    );
    this.firstName = newFirstName;
    this.lastName = newLastName;
  }
  showChanges() {
    console.log(`
____________________________________________
__________ The History of Changes __________
`);
    this.changes.forEach(record => {
      console.log(record);
    });
  }
}

class Employee extends Person {
  constructor(firstName, lastName, position) {
    //  added id generator for employeeId
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

    super(firstName, lastName);
    this.position = position;
    this.employeeId = idGenerator();
  }
  showNameAndPosition() {
    return `${this.employeeId}: ${this.showName()}, ${this.position}`;
  }
  changePosition(newPosition) {
    this.addChangesRecord('Position', this.position, newPosition);
    this.position = newPosition;
  }
}

// result
const employee = new Employee('John', 'Doe', 'accountant');

console.log(employee.showName()); // `John Doe`
console.log(employee.showNameAndPosition()); // `John Doe: accountant`

// changeName
employee.changeName('Sarah', 'Black');

// changePosition
employee.changePosition('software engineer');

console.log(employee.showName()); // `Sarah Black`
console.log(employee.showNameAndPosition()); // `Sarah Black: software engineer`

// show the history of changes of employee (name and position)
employee.showChanges();
