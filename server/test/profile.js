const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Profile = require('../models/Profile');
const should = chai.should();

chai.use(chaiHttp);

describe('Profile', () => {
    beforeEach((done) => {
        Profile.remove({}, (err) => {
            done();
        })
    })
});

/**
 * Test profile creation
 */
describe('/POST /profile/create', () => {
    it('it should create a profile', (done) => {

        let profile = {
            name : "Ghaffar Mudashiru",
            description: "A software engineer",
            mbti: "ISFJ",
            enneagram: "9w3",
            variant: "sp/so",
            tritype: "725",
            socionics: "SEE",
            sloan: "RCOEN",
            psyche: "FEVL",
            temperaments: "Phlegmatic[Dominant]"
        }
        chai.request(server)
            .post('/profile/create')
            .send(profile)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
});

/**
 * Test fetch all profiles
 */
describe('GET /profile', () => {
    it('it should return all profiles', (done) => {
        chai.request(server)
            .get('/profile')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })
});