// import chai from 'chai';
// import app from 'app/app';
// import chaiHttp from 'chai-http'

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('Customer', () => {
//   let id;
//   it('Get customers', async () => {
//     try {
//       const res = await chai.request(app).get('/manages/customers');
//       console.log(res);
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an('object');
//       expect(res.body).to.have.property('total').that.is.a('number');
//       expect(res.body).to.have.property('items');
//       expect(res.body.items).to.be.an('array');
//       expect(res.body.items).to.not.be.empty;
//     } catch (err) {
//       throw err;
//     }
//   });
// })
