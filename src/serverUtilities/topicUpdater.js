"use strict";
const mongo = require('mongodb');

// This function updates the default topics to display so that we ony show the 9 biggest topics. 


function topicUpdater(dbs) {
    setTimeout(() => {

        (async function() {
            let collections = await dbs.notes.listCollections().toArray();
            let collectionNames = [];
            // First we need an array of all my collections.
            for(let i = 0; i < collections.length; i++) {
                collectionNames.push(collections[i].name);
            }

            // Now we need to get size.
            let topicInfoForSort = []
            for(let i = 0; i < collectionNames.length; i++) {
                let topicStats = await dbs.notes.collection(collectionNames[i]).stats()

                let topicInfo = {
                        name: collectionNames[i],
                        size: topicStats.size
                    }
                topicInfoForSort.push(topicInfo);
            }
            // Then we need to sort.
            let sortedTopicInfo = topicInfoForSort.sort(compare).splice(0,9);
            let topicsToDisplay = [];
            for(let i = 0; i < sortedTopicInfo.length; i++) {
                topicsToDisplay.push(sortedTopicInfo[i].name)
            }
            // Last we need to update database.
            dbs.metaData.collection("helper").updateOne({"document": "collectionInfo"}, {$set: {"defaultTopicDisplay": topicsToDisplay}})
        })();

        topicUpdater(dbs);
    }, 86400000)
}


module.exports = topicUpdater;


function compare(a,b) {
  if (a.size < b.size)
    return 1;
  if (a.size > b.size)
    return -1;
  return 0;
}
