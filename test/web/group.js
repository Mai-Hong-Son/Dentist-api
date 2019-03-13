import chai from 'chai';
import app from 'app/app';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Group', () => {
  let id;
  it('Create groups', async () => {
    try {
      const res = await chai.request(app).post('/manages/groups').send({ name: 'test' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name', 'test');
      id = res.body.id;
    } catch (err) {
      throw err;
    }
  });

  it('Get detail group', async () => {
    try {
      const res = await chai.request(app).get('/manages/groups/' + id);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', id);
      expect(res.body).to.have.property('name');
    } catch (err) {
      throw err;
    }
  });

  it('Get groups', async () => {
    try {
      const res = await chai.request(app).get('/manages/groups');
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

  it('Edit groups', async () => {
    try {
      const data = { name: 'newName' };
      const res = await chai.request(app).put('/manages/groups/' + id).send(data);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal('newName');
    } catch (err) {
      throw err;
    }
  });

  it('Delete groups', async () => {
    try {
      const res = await chai.request(app).del('/manages/groups/' + id);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err;
    }
  });
})