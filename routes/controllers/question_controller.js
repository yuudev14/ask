const db = require('../../db');
const dashboard = require('./dashboard_controller');

const submitQuestion = async(req, res, next) => {
    try {
        const {question, question_context, tags} = req.body;

        await db.query("INSERT INTO questions (account_id, question, context, tags) VALUES ($1, $2, $3, $4)", [req.user, question, question_context, tags]);
        // const questions = await db.query("SELECT * FROM questions ORDER BY date DESC");
        res.send(true);
        
    } catch (error) {
        if(error.constraint === 'questions_question_key'){
            res.status(400).send('Question already exist')
        }
        
    }
}

const answerQuestion = async(req, res) => {
    try {
        const {answer, question_id} = req.body;
        let answer_id = await db.query(`INSERT INTO answers (account_id, question_id, answer) values ($1, $2, $3) RETURNING answer_id`, [req.user, question_id, answer]);
        const data = await db.query(`SELECT accounts.user_id, accounts.username, questions.question FROM questions 
                                        JOIN accounts 
                                        ON accounts.user_id = questions.account_id
                                        WHERE question_id = $1`, [question_id]);

        const account_id = data.rows[0].user_id;
        answer_id = answer_id.rows[0].answer_id;
        const room = data.rows[0].username
        const question = data.rows[0].question;        
        res.send({account_id, answer_id, question, room});
        
    } catch (error) {
        console.log(error);
        
    }

}

const deleteQuestion = async(req, res) => {
    try {
        await db.query(`DELETE FROM questions WHERE question_id = $1`, [req.params.id]);
        res.send(true);
        
    } catch (error) {
        console.log(error)
        
    }
}


const vote = async(vote_num, req, res) => {
    try {
        const question_id = req.params.id;
        const voteVerify = await db.query(`SELECT * FROM question_votes WHERE question_id = $1 AND account_id = $2`, [question_id, req.user]);
        if(voteVerify.rowCount === 0){
            await db.query(`INSERT INTO question_votes (question_id, account_id, vote) VALUES ($1, $2, ${vote_num})`, [question_id, req.user])
        }else{
            if(voteVerify.rows[0].vote === vote_num){
                await db.query(`DELETE FROM question_votes WHERE question_id = $1 AND account_id = $2`, [question_id, req.user]);
            }else{
                await db.query(`UPDATE question_votes SET vote = ${vote_num} WHERE question_id = $1 AND account_id = $2`, [question_id, req.user]);
            }
        }
        const question_details = await db.query(dashboard.questionDetailsQuery, [question_id]);
        console.log(question_details.rows[0]);

        res.send(question_details.rows[0]);
    } catch (error) {
        console.log(error);
        
    }
}
const vote_up = (req, res, next) => {
    vote(1, req, res);
}

const vote_down = (req, res, next) => {
    vote(-1, req, res);
}

module.exports = {
    submitQuestion,
    vote_up,
    vote_down,
    answerQuestion,
    deleteQuestion
}