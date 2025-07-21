export const departments = [
  "HR", "Engineering", "Finance", "Marketing", "Design"
];
export const randomDepartment = (id) => departments[id % departments.length];
export const randomRating = (id) => (id % 5) + 1;
export const mockBio = (name) => `${name} is a great team player with consistent results.`;
export const mockHistory = (n = 4) => Array(n).fill(0).map((_,i) => ({
  year: 2022 - i, rating: Math.floor(Math.random()*5) + 1
}));
