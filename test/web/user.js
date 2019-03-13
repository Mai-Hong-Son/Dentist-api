import chai from 'chai';
import chaiHttp from 'chai-http';
import { stub } from 'sinon';
import app from 'app/app';
// const app = 'http://localhost:3000';
import * as mail from './../../mail';

chai.use(chaiHttp);
const agent = chai.request.agent(app);
const expect = chai.expect;

describe('User', () => {
  let access_token;
  let id;

  it('Basic login, return valid accesstoken', async () => {
    try {
      const res = await chai.request(app).post('/manages/auth/basic')
        .send({ username: 'test', password: '123' });
      expect(res.body).to.have.property('access_token');
      expect(res.body).to.have.property('refresh_token');
      access_token=res.body.access_token
    } catch (err) {
      throw err;
    }
  });

  it('Get current user, return user information', async () => {
    try {
      const res = await chai.request(app).get('/users/me')
        .set('Authorization', 'Bearer ' + access_token);
      const { body } = res;
      expect(body).to.have.property('username', 'test');
      expect(body).to.have.property('email');
      id = body.id;
    } catch (err) {
      throw err
    }
  });

  it('Forgot password', async () => {
    try {
      const sendMail = stub(mail, 'sendMail').returns(true);
      const res = await chai.request(app).post('/manages/auth/forgot-password')
        .send({ email: 'test@mock.com' })
      const { body } = res;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('ok');
      sendMail.restore();
    } catch (err) {
      throw err;
    }
  });

  // it('Edit user', async () => {
  //   try {
  //     const newUser = {
  //       password: '123',
  //       phone: '0123456789',
  //       birthday: '1990-11-11',
  //       address: 'test',
  //       sex: 1,
  //       occupation: 'tester',
  //       note: 'test',
  //     };
  //     const res = await agent.put('/manages/auth/' + id).send(newUser);
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.have.property('message');
  //     const data = await agent.get('/users/me').set('Authorization', 'Bearer ' + access_token)
  //     const user = data.body;
  //     expect(user).to.be.an('object');
  //     expect(user).to.have.property('phone', '0123456789');
  //     expect(user).to.have.property('birthday', '1990-11-11');
  //     expect(user).to.have.property('address', 'test');
  //     expect(user).to.have.property('sex', 1);
  //     expect(user).to.have.property('occupation', 'tester');
  //     expect(user).to.have.property('note', 'test');
  //     agent.close();
  //   } catch (err) {
  //     throw err;
  //   }
  // });

});
