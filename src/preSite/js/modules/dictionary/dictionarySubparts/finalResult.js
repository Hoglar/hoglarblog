"use strict";
 // When we press one of the 5 returned results, we will get one page back on the dictionary site.
 // This will show the
 // finalResult is getting the finalResult prop, which is a object of document details.

 import React from "react";
 import EditDocument from "./editDocument.js";

 import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';
 import updateLikes from '../functionality/updateLikes.js';

 export default class FinalResult extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
             doneLiking: false,
             likeButton: (this.props.finalResult.score.likes.includes(this.props.loggedInUser) ?
                         "dictionaryLikedByUser" : ""),
             dislikeButton: (this.props.finalResult.score.dislikes.includes(this.props.loggedInUser) ?
                         "dictionaryDislikedByUser" : "")
         }
     }


     likeButtonClicked() {
         let user = this.props.loggedInUser;
         let likeArr = this.props.finalResult.score.likes;

         // Check if user is in likeArr
         if(!likeArr.includes(user)) {
             console.log("Did not find user")
             updateLikes(this.props.finalResult.topic,
                              this.props.finalResult._id,
                              this.props.loggedInUser,
                              "like")
             .then(()=> {
                  this.setState({doneLiking: true});
             })
         }
     }

     dislikeButtonClicked() {
         let user = this.props.loggedInUser;
         let dislikeArr = this.props.finalResult.score.dislikes;

         // Check if user is in likeArr
         if(!dislikeArr.includes(user)) {
             console.log("Did not find user")
             updateLikes(this.props.finalResult.topic,
                              this.props.finalResult._id,
                              this.props.loggedInUser,
                              "dislike")
             .then(()=> {
                  this.setState({doneLiking: true});
             })
         }
     }

     render() {
         return (
             <div className="dictionaryFinalResult">
                 <div className="dictionaryFinalResultTop dictionaryBox">
                     <h2>{capitalizeFirstLetter(this.props.finalResult.title)}</h2>
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

                {this.state.doneLiking ? null :

                    <div className="dictionaryFinalResultEditSection">

                         {(this.props.loggedInUser === this.props.finalResult.author) ?
                             <EditDocument document={this.props.finalResult}
                                           handleDocumentDeletion={this.props.handleDocumentDeletion.bind(this)}/> :
                             null}

                         {(this.props.loggedInUser !== this.props.finalResult.author &&
                           this.props.loggedInUser !== "guest") ?
                             <button className={"dictionaryFooterCreateButton " + this.state.likeButton}
                                     onClick={this.likeButtonClicked.bind(this)}>
                                 Like
                             </button>
                         : null}

                         {(this.props.loggedInUser !== this.props.finalResult.author &&
                           this.props.loggedInUser !== "guest") ?
                             <button className={"dictionaryFooterCreateButton " + this.state.dislikeButton}
                                     onClick={this.dislikeButtonClicked.bind(this)}>
                                 Dislike
                             </button>
                         : null}
                     </div> }


                 </div>
             </div>
         )
     }
 }
