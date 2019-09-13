// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeList {
  constructor() {
    this.range = [];
  }

  /**
   * Compares two ranges and returns the position of range1 relative to range2
   *
   * BEFORE - range1 is before range2 and doesn't intersects
   * BOTTOM_INT - range1 is before range2 and intersects
   * INSIDE - range1 is inside of range2
   * UPPER_INT- range1 is after range2 and intersects
   * OVERLAP - range1 is overlapping range2
   * AFTER- range1 is after range2 and doesn't intersects
   *
   */
  compareRanges([start1, end1], [start2, end2]) {
    if (start1 > end2) return 'AFTER';
    if (start1 <= start2) {
      if (end1 < start2) return 'BEFORE';
      if (end1 <= end2) return 'BOTTOM_INT';
      if (end1 >= end2) return 'OVERLAP';
    }
    if (start1 < end1) {
      if (end1 <= end2) return 'INSIDE';
      if (end1 > end2) return 'UPPER_INT';
    }
  }

  /**
   * Check if the argument range is correct
   */
  correctRange(range) {
    return (
      range &&
      range.length === 2 &&
      Number.isInteger(range[0]) &&
      Number.isInteger(range[1]) &&
      range[0] <= range[1]
    );
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (!this.correctRange(range)) {
      console.log('Error: Wrong range');
      return;
    }

    const [start, end] = range;

    if (start === end) return;

    if (this.range.length === 0) {
      this.range.push(range);
      return;
    }

    for (let [i, subrange] of this.range.entries()) {
      switch (this.compareRanges(range, subrange)) {
        case 'INSIDE':
          return;
        case 'BEFORE':
          this.range.splice(i, 0, range);
          return;
        case 'BOTTOM_INT':
          subrange[0] = start;
          return;
        case 'OVERLAP':
          subrange[0] = start;
          subrange[1] = end;
          // check for intersection with next subrange
          i++;
          while (this.range[i] && this.range[i][0] <= end) {
            this.range.splice(i, 1);
          }
          return;
        case 'UPPER_INT':
          subrange[1] = end;
          // check for crossing with next subrange
          i++;
          while (this.range[i] && this.range[i][0] <= end) {
            subrange[1] = Math.max(subrange[1], this.range[i][1]);
            this.range.splice(i, 1);
          }
          return;
        default:
          continue;
      }
    }
    this.range.push(range);
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (!this.correctRange(range)) {
      console.log('Error: Wrong range');
      return;
    }

    const [start, end] = range;

    if (this.range.length === 0 || start === end) return;

    for (let [i, subrange] of this.range.entries()) {
      switch (this.compareRanges(range, subrange)) {
        case 'BEFORE':
          return;
        case 'BOTTOM_INT':
          subrange[0] = end;
          if (subrange[0] === subrange[1]) this.range.splice(i, 1);
          return;
        case 'OVERLAP':
          this.range.splice(i, 1);
          // check for crossing with next subrange
          while (this.range[i] && this.range[i][1] < end) {
            this.range.splice(i, 1);
          }
          if (this.range[i] && this.range[i][0] < end) {
            this.range[i][0] = end;
          }
          return;
        case 'INSIDE':
          const temp = subrange[1];
          subrange[1] = start;
          this.range.splice(i + 1, 0, [end, temp]);
          return;
        case 'UPPER_INT':
          subrange[1] = start;
          // check for crossing with next subrange
          i++;
          while (this.range[i] && this.range[i][1] < end) {
            this.range.splice(i, 1);
          }
          if (this.range[i] && this.range[i][0] < end) {
            this.range[i][0] = end;
          }
          return;
        default:
          continue;
      }
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    return this.range.length === 0
      ? console.log('This range is empty')
      : console.log(
          this.range
            .map(subrange => `[${subrange[0]}, ${subrange[1]})`)
            .join(' ')
        );
  }
}

//************************************************************//
// Example run
const rl = new RangeList();
rl.print();
// Should display: This range is empty

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([0, 15]);
rl.print();
// Should display: [15, 21)

rl.add([1, 10]);
rl.print();
// Should display: [1, 10) [15, 21)

rl.add([11, 21]);
rl.print();
// Should display: [1, 10) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 10) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)

rl.add([-5, 0]);
rl.print();
// Should display: [-5, 0) [1, 3) [19, 21)

rl.remove([-1, 20]);
rl.print();
// Should display: [-5, -1) [20, 21)

rl.add([-6, 30]);
rl.print();
// Should display: [-6, 30)

rl.remove([28, 29]);
rl.print();
// Should display: [-6, 28) [29, 30)

rl.remove([-Infinity, +Infinity]);
rl.print();
// Should display: This range is empty

rl.add([0, '6']);
// Should display: Error: Wrong range
rl.remove([7]);
// Should display: Error: Wrong range
