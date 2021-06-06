const fsPromises = require('fs').promises;
const { join } = require('path');

module.exports = async (req, res) => {
    try {
        let result = [];
        let year = (new Date()).getFullYear();
        let text = await fsPromises.readFile(join(__dirname, '..', '..', 'data', `${year}.json`), 'utf8');

        let month = req.query.month;
        if (req.query.year) {
            year = req.query.year;
            text = await fsPromises.readFile(join(__dirname, '..', '..', 'data', `${year}.json`), 'utf8');
        }
        let parseResult = JSON.parse(text);

        if (month && year) {
            result = parseResult.filter(item => {
                if ((new Date(item.holiday_date)).getMonth() + 1 == month) {
                    return item;
                }
            });
        } else if (year) {
            result = parseResult;
        }

        res.status(200).send(result);
    } catch (error) {
        res.status(200).send([]);
    }
}