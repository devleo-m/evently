import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import participationRouter from '../routes/participationRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', participationRouter);

describe('Participation API', () => {
  let createdParticipationId: number | undefined;

  test('Deve criar uma nova participação', async () => {
    const createResponse = await supertest(app)
      .post('/api/participations')
      .send({
        user_id: 1,
        event_id: 1,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');
    expect(createResponse.body.user_id).toBe(1);
    expect(createResponse.body.event_id).toBe(1);

    createdParticipationId = createResponse.body.id;
  });

  test('Deve listar todas as participações', async () => {
    const listResponse = await supertest(app)
      .get('/api/participations');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toBeInstanceOf(Array);
  });

  test('Deve buscar uma participação pelo ID', async () => {
    if (!createdParticipationId) {
      throw new Error('Participação não criada, não é possível testar busca por ID.');
    }

    const getResponse = await supertest(app)
      .get(`/api/participations/${createdParticipationId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('id', createdParticipationId);
  });

  test('Deve atualizar uma participação', async () => {
    if (!createdParticipationId) {
      throw new Error('Participação não criada, não é possível testar atualização.');
    }

    const updateResponse = await supertest(app)
      .put(`/api/participations/${createdParticipationId}`)
      .send({
        user_id: 2,
        event_id: 2,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('id', createdParticipationId);
    expect(updateResponse.body.user_id).toBe(2);
    expect(updateResponse.body.event_id).toBe(2);
  });

  test('Deve deletar uma participação', async () => {
    if (!createdParticipationId) {
      throw new Error('Participação não criada, não é possível testar deleção.');
    }

    const deleteResponse = await supertest(app)
      .delete(`/api/participations/${createdParticipationId}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({ message: 'Participação deletada com sucesso' });

    const getResponse = await supertest(app)
      .get(`/api/participations/${createdParticipationId}`);
    expect(getResponse.status).toBe(404);
  });
});