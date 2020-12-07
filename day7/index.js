const { input } = require("./input");

class Bag {
  constructor(color) {
    this.bagsIMustContain = [];
    this.color = color;
    //this.qty = qty;
  }

  addBag(bag, qty) {
    if (!this.bagsIMustContain.some(([b, _]) => b.color === bag.color)) {
      this.bagsIMustContain.push([bag, qty]);
    }
  }

  canIOrMyChildrenHold(color) {
    return (
      this.canIHoldThis(color) ||
      this.bagsIMustContain.some(([b, _]) => b.canIOrMyChildrenHold(color))
    );
  }

  canIHoldThis(color) {
    return this.bagsIMustContain.some(([b, _]) => b.color === color);
  }

  howManyBagsMustIContain() {
    if (this.bagsIMustContain.length <= 0) return 1;
    return (
      1 +
      this.bagsIMustContain.reduce(
        (acc, [b, qty]) => acc + b.howManyBagsMustIContain() * qty,
        0
      )
    );
  }
}

class Bags {
  constructor() {
    this.bags = [];
  }

  populate(rules) {
    rules.forEach(([color, containsRules]) => {
      const parent = this.add(color);
      containsRules.forEach(([qty, color]) => {
        if (qty < 1) console.log("less than 1", color);
        const child = this.add(color);
        parent.addBag(child, qty);
      });
    });
  }

  add(color) {
    const existing = this.bags.find((b) => b.color == color);
    if (existing) {
      return existing;
    }
    const newBag = new Bag(color);
    this.bags.push(newBag);
    return newBag;
  }

  howManyCanHold(color) {
    let count = 0;
    this.bags.forEach((bag) => {
      const x = bag.canIOrMyChildrenHold(color);
      if (x) count++;
    });
    return count;
  }
  howManyBagsDoINeedToContain(color) {
    const bag = this.add(color);
    return bag.howManyBagsMustIContain();
  }
}

const bags = new Bags();
bags.populate(input);
//console.log(bags.howManyCanHold("shiny gold"));
console.log(bags.howManyBagsDoINeedToContain("shiny gold"));
