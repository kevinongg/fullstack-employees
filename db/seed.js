import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");
// console.log(employees);

async function seedEmployees() {
  // TODO
  for (let i = 0; i < 10; i++) {
    const obj = {
      name: faker.person.fullName(),
      birthday: faker.date.soon(),
      salary: faker.number.int({ max: 500000 }),
    };
    console.log(obj);
    await createEmployee(obj);
  }
}
