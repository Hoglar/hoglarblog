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

                 <div className="dictionaryFinalResultFooter dictionaryBox">


                     {(this.props.loggedInUser === this.props.finalResult.author) ?
                         <EditDocument /> :
                         null}

                     <div className="dictionaryFinalResultCredentials">
                         <p>{capitalizeFirstLetter(this.props.finalResult.author)}</p>
                         <p id="dictionaryDocumentDate">{this.props.finalResult.date.substring(0, 10)}</p>
                     </div>

                 </div>


             </div>
         )
     }
 }
