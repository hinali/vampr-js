class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this; // Set this vampire as the creator of the offspring
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      distance++;
    }

    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  closestCommonAncestor(vampire) {
    const ancestorsA = new Set();
    let currentVampireA = this;

    // Collect ancestors of vampire A
    while (currentVampireA) {
      ancestorsA.add(currentVampireA);
      currentVampireA = currentVampireA.creator;
    }

    let currentVampireB = vampire;

    // Check for the closest common ancestor by traversing the ancestors of vampire B
    while (currentVampireB) {
      if (ancestorsA.has(currentVampireB)) {
        return currentVampireB; // Found the common ancestor
      }
      currentVampireB = currentVampireB.creator;
    }

    return null; // No common ancestor found
  }
}

module.exports = Vampire;
