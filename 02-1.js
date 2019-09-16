// **ES5**
const Person = function(firstName, lastName) {
  this.changes = [];
  this.firstName = firstName;
  this.lastName = lastName;
};

Person.prototype.showName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.addChangesRecord = function(fieldName, oldValue, newValue) {
  this.changes.push(
    `${new Date().toUTCString()}: ${fieldName} was changed from ${oldValue} to ${newValue}`
  );
};

Person.prototype.changeName = function(newFirstName, newLastName) {
  this.addChangesRecord(
    `Name`,
    `${this.firstName} ${this.lastName}`,
    `${newFirstName} ${newLastName}`
  );
  this.firstName = newFirstName;
  this.lastName = newLastName;
};

Person.prototype.showChanges = function() {
  console.log(`
____________________________________________
__________ The History of Changes __________
`);
  this.changes.forEach(record => {
    console.log(record);
  });
};

const Employee = function(firstName, lastName, position) {
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

  Person.call(this, firstName, lastName);
  this.position = position;
  this.employeeId = idGenerator();
};

Object.setPrototypeOf(Employee.prototype, Person.prototype);

Employee.prototype.showNameAndPosition = function() {
  return `${this.employeeId}: ${this.showName()}, ${this.position}`;
};

Employee.prototype.changePosition = function(newPosition) {
  this.addChangesRecord('Position', this.position, newPosition);
  this.position = newPosition;
};

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
