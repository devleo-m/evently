import supertest from "supertest";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "../routes/userRouter";

const app = express();

app.use(bodyParser.json());
app.use("/api", userRouter);

describe("User API", () => {
  test("Deve criar um novo usuário", async () => {
    const uniqueEmail = `testuser+${Date.now()}@example.com`;

    const createResponse = await supertest(app)
    .post("/api/users")
    .send({
      email: uniqueEmail,
      password: "root123",
    });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty("id");
    expect(createResponse.body.email).toBe(uniqueEmail);

    await supertest(app).delete(`/api/users/${createResponse.body.id}`);
  });

  test("Deve listar todos os usuários", async () => {
    const listResponse = await supertest(app)
    .get("/api/users")

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toBeInstanceOf(Array);
  });

  test("Deve buscar um usuário pelo ID", async () => {
    const listResponse = await supertest(app)
    .get(`/api/users/1`)

    expect(listResponse.status).toBe(200);
  })

  test("Deve atualizar um usuário", async () => {
    const updateResponse = await supertest(app)
    .put(`/api/users/1`)
    .send({
      email: "testuser123@gmail.com",
      password: "root123",
    })

    expect(updateResponse.status).toBe(200);
})

  test("Deve deletar um usuário", async () => {
    const uniqueEmail = `testuser+${Date.now()}@example.com`;
    const createResponse = await supertest(app)
    .post("/api/users")
    .send({
      email: uniqueEmail,
      password: "root123",
    });

    const deleteResponse = await supertest(app)
    .delete(`/api/users/${createResponse.body.id}`)

    expect(deleteResponse.status).toBe(200);
  })
});
