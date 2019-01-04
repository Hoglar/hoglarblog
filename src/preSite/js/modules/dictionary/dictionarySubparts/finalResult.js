"use strict";
 // When we press one of the 5 returned results, we will get one page back on the dictionary site.
 // This will show the
 // finalResult is getting the finalResult prop, which is a object of document details.

 import React from "react";
 import EditDocument from "./editDocument.js";

 import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

 export default class FinalResult extends React.Component {
     render() {
         return (
             <div className="dictionaryFinalResult">
                 <div className="dictionaryFinalResultTop dictionaryBox">
                     <h1>{capitalizeFirstLetter(this.props.finalResult.title)}</h1>
                     <p>{this.props.finalResult.explanation}</p>
                 </div>
                 <div className="dictionaryFinalResultExample dictionaryBox">
                     <p className="dictionaryGreyText">Example:</p>
                     <pre><code>{this.props.finalResult.example}</code></pre>
                 </div>
                 <div className="dictionaryFinalResultReference dictionaryBox">
                     <p className="dictionaryGreyText">Reference:</p>
                     <p>{this.props.finalResult.reference}</p>
                 </div>

                 <div className="dictionaryFinalResultFooter dictionaryBox">

                     <div className="dictionaryFinalResultCredentials">
                         <p>{capitalizeFirstLetter(this.props.finalResult.author)}</p>
                         <p id="dictionaryDocumentDate">{this.props.finalResult.date.substring(0, 10)}</p>
                     </div>

                 </div>


             </div>
         )
     }
 }
