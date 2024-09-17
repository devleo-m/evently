import supertest from "supertest";
import express from "express";
import bodyParser from "body-parser";
import profileRouter from "../routes/profileRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api", profileRouter);

describe("Profile API", () => {
  test("Deve criar um novo perfil", async () => {
    const createResponse = await supertest(app)
      .post("/api/profiles")
      .send({
        name: "John Doe",
        bio: "This is a bio",
        birth_date: "1990-01-01",
        user_id: 3,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty("id");
    expect(createResponse.body.name).toBe("John Doe");

    await supertest(app).delete(`/api/profiles/${createResponse.body.id}`);
  });

  test("Deve listar todos os perfis", async () => {
    const listResponse = await supertest(app)
      .get("/api/profiles");

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toBeInstanceOf(Array);
  });

  test("Deve buscar um perfil pelo ID", async () => {
    const listResponse = await supertest(app)
      .get(`/api/profiles/1`);

    expect(listResponse.status).toBe(200);
  });

  test("Deve atualizar um perfil", async () => {
    const updateResponse = await supertest(app)
      .put(`/api/profiles/1`)
      .send({
        name: "Jane Doe",
        bio: "Updated bio",
        birth_date: "1995-01-01",
        user_id: 1,
      });
  
    expect(updateResponse.status).toBe(200);
  });
  
  test("Deve deletar um perfil", async () => {
    const createResponse = await supertest(app)
      .post("/api/profiles")
      .send({
        name: "John Doe",
        bio: "This is a bio",
        birth_date: "1990-01-01",
        user_id: 4,
      });

    const deleteResponse = await supertest(app)
      .delete(`/api/profiles/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(200);
  });
});