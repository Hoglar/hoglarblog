"use strict";
 // When we press one of the 5 returned results, we will get one page back on the dictionary site.
 // This will show the topic.

 import React from "react";

 import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

 export default class FinalResult extends React.Component {
     render() {
         return (
             <div className="dictionaryFinalResult">
                 <div className="dictionaryFinalResultTop">
                     <h3>{capitalizeFirstLetter(this.props.finalResult.title) + ":"}</h3>
                     <p>{this.props.finalResult.explanation}</p>
                 </div>
                 <div class="dictionaryFinalResultExample">
                     <p>Example:</p>
                     <p>{this.props.finalResult.example}</p>
                 </div>
                 <div>
                     <p>Reference:</p>
                     <p>{this.props.finalResult.reference}</p>
                 </div>
                 <div className="dictionaryFinalResultCredentials">
                     <p>{capitalizeFirstLetter(this.props.finalResult.author)}</p>
                     <p>{this.props.finalResult.date.substring(0, 10)}</p>
                 </div>

             </div>
         )
     }
 }
