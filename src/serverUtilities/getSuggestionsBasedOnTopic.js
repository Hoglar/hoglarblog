'use strict';
const comparePopularity = require("./comparePopularity.js");

async function getSuggestionsBasedOnTopic(dbs, topic, res) {
    let documents = await dbs.notes.collection(topic).find({"score.popularity": {$gt: 5}}).toArray();

    let sortedDocs = documents.sort(comparePopularity);
    let returnDocs = sortedDocs.splice(0, 20);
    res.json({"documents": returnDocs});
}

module.exports = getSuggestionsBasedOnTopic;

// Denne ble bra.
