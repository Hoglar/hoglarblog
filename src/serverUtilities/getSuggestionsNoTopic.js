'use strict';
const comparePopularity = require("./comparePopularity.js");


async function getSuggestionsNoTopic(dbs, res) {
    // We need to make querry for all documents within notes that is higher than 5
    let collectionArr = await dbs.notes.listCollections().toArray();


    let returnArray = collectionArr.map(async(collection) => {
        let documentArr = [];
        let colDocuments = await dbs.notes.collection(collection.name).find({"score.popularity": {$gt: 5}}).toArray();
        for (let document of colDocuments) {
            documentArr.push(document);
        }
        return documentArr;
    })

    Promise.all(returnArray)
    .then(
        function(values) {
            let mergedValues = [].concat.apply([], values);

            let sortedDocumentArr = mergedValues.sort(comparePopularity);
            let returnDocs = sortedDocumentArr.splice(0, 20);
            res.json({"documents": returnDocs});
        }
    )
    .catch(
        function(err) {
            console.error(err);
        }
    )
}

module.exports = getSuggestionsNoTopic;
