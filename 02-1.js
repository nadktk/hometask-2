// **ES5**
const Person = function(firstName, lastName) {
  this.changes = [];
  this.firstName = firstName;
  this.lastName = lastName;
  this.showName = function() {
    return `${this.firstName} ${this.lastName}`;
  };
  this.addChangesRecord = function(fieldName, oldValue, newValue) {
    this.changes.push(
      `${new Date().toUTCString()}: ${fieldName} was changed from ${oldValue} to ${newValue}`
    );
  };
  this.changeName = function(newFirstName, newLastName) {
    this.addChangesRecord(
      `Name`,
      `${this.firstName} ${this.lastName}`,
      `${newFirstName} ${newLastName}`
    );
    this.firstName = newFirstName;
    this.lastName = newLastName;
  };
  this.showChanges = function() {
    console.log(`
____________________________________________
__________ The History of Changes __________
`);
    this.changes.forEach(record => {
      console.log(record);
    });
  };
};

const Employee = function(firstName, lastName, position) {
  Person.call(this, firstName, lastName);
  this.position = position;
  this.showNameAndPosition = function() {
    return `${this.showName()}: ${this.position}`;
  };
  this.changePosition = function(newPosition) {
    this.addChangesRecord('Position', this.position, newPosition);
    this.position = newPosition;
  };
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
