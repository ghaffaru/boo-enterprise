const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Comment = require('../models/Comment');
const should = chai.should();

chai.use(chaiHttp);

describe('Comment', () => {
    beforeEach((done) => {
        Comment.remove({}, (err) => {
            done();
        })
    })
});
var testCommentId;
var testProfileId;
/**
 * Test comment creation
 */
 describe('/POST /comment/create', () => {
    it('it should create a comment for a profile', (done) => {

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
                testProfileId = res.body.profile._id;
                let comment = {
                    commentTo: res.body.profile._id,
                    commentBy: "Ghaffaru Mudashiru",
                    voteOptions: ["MBTI", "Zodiac"]
                }
        
                chai.request(server)
                    .post('/comment/create')
                    .send(comment)
                    .end((err, res) => {
                        testCommentId = res.body.comment._id;
                        res.should.have.status(200);
                        done();
                    })
            })
    })
 })

 /**
  * Test comment like and unlike
  */
  describe('/POST /comment/like-unlike', () => {
        it('it should like or unlike', (done) => {
            let body = {
                    action: "like",
                    commentId : testCommentId
            }
            chai.request(server)
                .post('/comment/like-unlike')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
  })

/**
 * Test sort comments
 */
 describe('/GET /comment/:profileId/sort/best', () => {
    it('it should sort comments by best or recent', (done) => {
       
        chai.request(server)
            .get('/comment/'+ testProfileId + '/sort/best')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

/**
 * Test filter comments
 */
 describe('/GET /comment/:profileId/filter/:personality', () => {
    it('it should sort comments by best or recent', (done) => {
       
        chai.request(server)
            .get('/comment/'+ testProfileId + '/sort/MBTI')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})