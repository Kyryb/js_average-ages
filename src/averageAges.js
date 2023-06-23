'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  const filteredMen = people.filter(({ sex, died }) => (sex === 'm')
    && (!century || century === Math.ceil(died / 100)));
  const ageSum = filteredMen
    .reduce((prev, person) => prev + (person.died - person.born), 0);
  const avgAge = ageSum / filteredMen.length;

  return avgAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => {
    return (person.sex === 'f') && (!withChildren
      || hasChild(people, person));
  });
  const ageSum = filteredWomen.reduce((prev, person) => {
    return prev + (person.died - person.born);
  }, 0);
  const avgAge = ageSum / filteredWomen.length;

  return avgAge;
}

function hasChild(people, potentialMother) {
  return people.some(({ mother }) => potentialMother.name === mother);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter((person) =>
    findMother(people, person.mother)
    && (!onlyWithSon || person.sex === 'm'));
  const ageDiff = filteredChildren.reduce((prev, child) => {
    const motherBorn = findMother(people, child.mother).born;

    return prev + (child.born - motherBorn);
  }, 0);
  const avgAgeDiff = ageDiff / filteredChildren.length;

  return avgAgeDiff;
}

function findMother(people, mother) {
  return people.find(person => person.name === mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
