'use strict';

async function getSuggestionsNoTopic(dbs, res) {
    res.json({successMessage: "Hello, its working from NOTIPTIP"});
    // We need to make querry for all documents within notes that is higher than 5

}

module.exports = getSuggestionsNoTopic;
