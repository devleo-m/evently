import supertest from "supertest";
import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "../routes/eventRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api", eventRoutes);

describe("Event API", () => {
    test("Deve criar um novo evento", async () => {
        const createResponse = await supertest(app)
          .post("/api/events")
          .send({
            title: "Evento Exemplo",
            description: "Descrição do evento",
            event_date: "2025/01/01",
            creator_id: 1,
          });
      
        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("id");
        expect(createResponse.body.title).toBe("Evento Exemplo");
      
        await supertest(app).delete(`/api/events/${createResponse.body.id}`);
      });
      
      test("Deve listar todos os eventos", async () => {
        const listResponse = await supertest(app)
          .get("/api/events");
      
        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toBeInstanceOf(Array);
      });
      

      test("Deve buscar um evento pelo ID", async () => {
        // Crie um evento para garantir que ele existe
        const createResponse = await supertest(app)
          .post("/api/events")
          .send({
            title: "Event to be fetched",
            description: "This event will be fetched",
            event_date: "2026/01/01", // Use um formato de data válido
            creator_id: 1
          });
      
        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("id");
      
        const listResponse = await supertest(app)
          .get(`/api/events/${createResponse.body.id}`);
      
        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toHaveProperty("title", "Event to be fetched");
      });
      

  test("Deve atualizar um evento", async () => {  
    const updateResponse = await supertest(app)
      .put(`/api/events/2`)
      .send({
        title: "Updated Event Title",
        description: "Updated event description",
        event_date: "2030/01/01",
        creator_id: 2,
      });
  
    expect(updateResponse.status).toBe(200);
  });
  
  test("Deve deletar um evento", async () => {
    const createResponse = await supertest(app)
      .post("/api/events")
      .send({
        title: "Event to be deleted",
        description: "This event will be deleted",
        event_date: "2025/05/05", 
        creator_id: 1
      });
  
    const deleteResponse = await supertest(app)
      .delete(`/api/events/${createResponse.body.id}`);
  
    expect(deleteResponse.status).toBe(200);
  });  
});