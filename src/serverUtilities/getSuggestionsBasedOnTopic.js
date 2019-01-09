'use strict';
const comparePopularity = require("./comparePopularity.js");

async function getSuggestionsBasedOnTopic(dbs, topic, res) {
    let documents = await dbs.notes.collection(topic).find({"score.popularity": {$gt: 5}}).toArray();

    let sortedDocs = documents.sort(comparePopularity);

    res.json({"documents": sortedDocs});
}

module.exports = getSuggestionsBasedOnTopic;

// Denne ble bra.
