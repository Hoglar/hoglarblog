"use strict";
 // When we press one of the 5 returned results, we will get one page back on the dictionary site.
 // This will show the

 import React from "react";

 import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

 export default class FinalResult extends React.Component {
     render() {
         return (
             <div className="dictionaryFinalResult">
                 <div className="dictionaryFinalResultTop dictionaryBox">
                     <h3>{capitalizeFirstLetter(this.props.finalResult.title) + ":"}</h3>
                     <p>{this.props.finalResult.explanation}</p>
                 </div>
                 <div class="dictionaryFinalResultExample dictionaryBox">
                     <p>Example:</p>
                     <p>{this.props.finalResult.example}</p>
                 </div>
                 <div className="dictionaryFinalResultReference dictionaryBox">
                     <p>Reference:</p>
                     <p>{this.props.finalResult.reference}</p>
                 </div>
                 <div className="dictionaryFinalResultCredentials dictionaryBox">
                     <p>{"By: " + capitalizeFirstLetter(this.props.finalResult.author)}</p>
                     <p>{"."}</p>
                     <p>{this.props.finalResult.date.substring(0, 10)}</p>
                 </div>

             </div>
         )
     }
 }
