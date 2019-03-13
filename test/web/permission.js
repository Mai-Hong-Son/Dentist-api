import chai from 'chai';
import app from 'app/app';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Permission', () => {
  let id;

  // it('Create permissions', async () => {
  //   try {
  //     const data = {
  //       name: 'test',
  //       parent_id: 1,
  //       code: 'test',
  //       children: 'test'
  //     }
  //     const res = await chai.request(app).post('/manages/permissions').send(data);
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body).to.have.property('name', 'test');
  //     expect(res.body).to.have.property('parent_id', 1);
  //     expect(res.body).to.have.property('code', 'test');
  //     expect(res.body).to.have.property('children', 'test');
  //     id = res.body.id;
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  it('Get detail permission', async () => {
    try {
      const res = await chai.request(app).get('/manages/permissions/1');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('parent_id');
      expect(res.body).to.have.property('code');
    } catch (err) {
      throw err;
    }
  });

  it('Get permissions', async () => {
    try {
      const res = await chai.request(app).get('/manages/permissions');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('total').that.is.a('number');
      expect(res.body).to.have.property('items');
      expect(res.body.items).to.be.an('array');
      expect(res.body.items).to.not.be.empty;
    } catch (err) {
      throw err;
    }
  });

  // it('Edit permissions', async () => {
  //   try {
  //     const data = { name: 'newName' };
  //     const res = await chai.request(app).put('/manages/permissions/' + id).send(data);
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body.name).to.equal('newName');
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it('Delete permissions', async () => {
  //   try {
  //     const res = await chai.request(app).del('/manages/permissions/' + id);
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body).to.have.property('message');
  //   } catch (err) {
  //     throw err;
  //   }
  // });
})