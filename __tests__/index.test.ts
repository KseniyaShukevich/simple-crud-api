import { Server } from 'http';
import request, { Response, SuperTest, Test } from 'supertest';
import UserDtoType from '../src/components/user/UserDtoType';
import userRepository from '../src/components/user/userRepository';
import ResponseStatus from '../src/framework/http/ResponseStatus';

let server: Server;
let serverWrapped: SuperTest<Test>;

beforeAll(async () => {
  const app = await import('../src/index');
  server = app.default.server;
  
  serverWrapped = request(server);
});

afterAll((done) => {
  if (server) {
    server.close(done);
  }
});

beforeEach(() => {
  userRepository.clear();
});

describe('User router', () => {
  describe('Scenario 1: get all users', () => {
    let response: Response;

    beforeEach(async () => {
      response = await serverWrapped.get('/users');
    });

    it(`Response status ${ResponseStatus.OK}`, () => {
      expect(response.status).toBe(ResponseStatus.OK);
    });

    it('Response body is empty array', () => {
      expect(response.body).toEqual([]);
    });
  });

  describe('Scenario 2: user action by id', () => {
    let createUserDto: UserDtoType;
    let id: string;

    beforeEach(async () => {
      createUserDto = {
        username: 'Name',
        age: 20,
        hobbies: ['hobby1', 'hobby2'],
      };

      const createdUserResponse = await serverWrapped.post('/users').send(createUserDto);

      id = createdUserResponse.body.id;
    });

    describe('Get user by id', () => {
      let response: Response;

      beforeEach(async () => {
        response = await serverWrapped.get(`/users/${id}`);
      });

      it(`Response status ${ResponseStatus.OK}`, async () => {
        expect(response.status).toBe(ResponseStatus.OK);
      });

      it('The received user corresponds to the expected', () => {
        expect(response.body).toEqual({ id, ...createUserDto });
      });
    });

    describe('Delete user by id', () => {
      let response: Response;

      beforeEach(async () => {
        response = await serverWrapped.delete(`/users/${id}`);
      });

      it(`Response status ${ResponseStatus.DELETED}`, async () => {
        expect(response.status).toBe(ResponseStatus.DELETED);
      });
    });

    describe('Update user by id', () => {
      let response: Response;
      let newUserDto: UserDtoType;

      beforeEach(async () => {
        newUserDto = {
          username: 'NewName',
          age: 20,
          hobbies: [],
        }

        response = await serverWrapped.put(`/users/${id}`).send(newUserDto);
      });

      it(`Response status ${ResponseStatus.OK}`, async () => {
        expect(response.status).toBe(ResponseStatus.OK);
      });

      it('The received user corresponds to the expected', () => {
        expect(response.body).toEqual({ id, ...newUserDto });
      });
    });
  });

  describe('Scenario 3: user created successfully', () => {
    let createdUserResponse: Response;

    beforeEach(async () => {
      const createUserDto = {
        username: 'Name',
        age: 20,
        hobbies: ['hobby1', 'hobby2'],
      };

      createdUserResponse = await serverWrapped.post('/users').send(createUserDto);
    });

    it(`Response status ${ResponseStatus.CREATED}`, () => {
      expect(createdUserResponse.status).toBe(ResponseStatus.CREATED);
    });

    it(`Created user exists in database`, async () => {
      const createdUserId = createdUserResponse.body.id;
      const response = await serverWrapped.get(`/users/${createdUserId}`);

      expect(response.body).toBeTruthy();
    });
  });
});
