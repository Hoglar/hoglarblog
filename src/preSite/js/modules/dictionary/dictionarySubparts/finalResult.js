"use strict";
 // When we press one of the 5 returned results, we will get one page back on the dictionary site.
 // This will show the
 // finalResult is getting the finalResult prop, which is a object of document details.

 import React from "react";
 import EditDocument from "./editDocument.js";

 import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

 export default class FinalResult extends React.Component {


     likeButtonClicked() {
         console.log("Hello");
     }

     dislikeButtonClicked() {
         console.log("World")
     }

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
                         <p><i>{capitalizeFirstLetter(this.props.finalResult.author)}</i></p>
                         <p id="dictionaryDocumentDate">{this.props.finalResult.date.substring(0, 10)}</p>
                     </div>


                     <div className="dictionaryFinalResultEditSection">

                         {(this.props.loggedInUser === this.props.finalResult.author) ?
                             <EditDocument document={this.props.finalResult}
                                           handleDocumentDeletion={this.props.handleDocumentDeletion.bind(this)}/> :
                             null}

                         {(this.props.loggedInUser !== this.props.finalResult.author) ?
                             <button className="dictionaryFooterCreateButton"
                                     onClick={this.likeButtonClicked.bind(this)}>
                                 Like
                             </button>
                         : null}

                         {(this.props.loggedInUser !== this.props.finalResult.author) ?
                             <button className="dictionaryFooterCreateButton"
                                     onClick={this.dislikeButtonClicked.bind(this)}>
                                 Dislike
                             </button>
                         : null}
                     </div>

                 </div>
             </div>
         )
     }
 }
