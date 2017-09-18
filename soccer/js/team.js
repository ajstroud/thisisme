
class Team {
  constructor(city, name, offRating, defRating) {
    this.city = city;
    this.name = name;
    this.offRating = offRating;
    this.defRating = defRating;
  }

  updateName(city, name) {
    this.city = city;
    this.name = name;
  }

  getFullName() {
    return this.city + " " + this.name;
  }

  getOffensiveRating() {
    return offRating;
  }

  getDefensiveRating() {
    return defRating;
  }
}
