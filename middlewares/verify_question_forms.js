module.exports = (req, res, next) => {
    try {
        const {question} = req.body;
        if(question === ''){
            res.status(400).send(`question is empty`);
        }else{
            next();

        }

        
            
        
    } catch (error) {
        console.log(error)
        
    }
}