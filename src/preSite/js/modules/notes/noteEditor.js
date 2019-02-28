'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import updateNote from './noteFunctions/updateNote.js';
import deleteNote from './noteFunctions/deleteNote.js';
import notesUpdateLikes from './noteFunctions/notesUpdateLikes.js';
import EditorLineNumber from './noteEditor/editorLineNumber.js';
import NoteComments from './noteComments.js';

import EditorBlockUtilities from './noteEditor/editorBlockUtilities.js';
import EditorStyleUtilities from './noteEditor/editorStyleUtilities.js';
import {Editor, EditorState, convertToRaw, convertFromRaw, RichUtils} from 'draft-js';

// Dett er neste nå !

export default class noteEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            likeButton: (this.props.noteSearchSingleResult.score.likes.includes(this.props.loggedInUser) ?
                        "noteLikedByUser" : ""),
            dislikeButton: (this.props.noteSearchSingleResult.score.dislikes.includes(this.props.loggedInUser) ?
                        "noteDislikedByUser" : ""),

            editorState: EditorState.createEmpty()

        }
        this.onChange = (editorState) => this.setState({editorState});
    }


    componentDidMount() {
        if(this.props.noteSearchSingleResult.note !== "") {
            this.setState({editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(this.props.noteSearchSingleResult.note))
            )})
        }
    }

    saveContent() {
        this.setState({ convertedContent: convertToRaw(this.state.editorState.getCurrentContent())}, () => {
            console.log(this.state.convertedContent);
            let newNote = JSON.stringify(this.state.convertedContent);
            // UpdateNote takes 4 arguments: topic, id, new title and new content
            updateNote(this.props.noteSearchSingleResult.topic,
                       this.props.noteSearchSingleResult._id,
                       newNote)
            .then(
                (response) => {
                    console.log(response)
                    this.props.reloadNote(response);
                },
                (err) => {
                    console.error(err);
                }
            )
        });
    }

    deleteButtonClicked(e) {
        // When delete button gets clicked
        // We pass in the active document for readability!
        deleteNote(this.props.noteSearchSingleResult)
        .then(
            (response) => {
                console.log(response);
                this.props.listSuggestions();
                this.props.reloadNote(null);

            },
            (error) => {
                console.error(error);
            }
        )
    }

    commentButtonClicked() {
        if (this.state.showComments === false) {
            this.setState({showComments: true});
            // When we press comment, we must remove dictionary!
            this.props.hideDictionary();
        }
        else {
            this.setState({showComments: false});
        }
    }

    noteLikeButtonClicked() {

        let user = this.props.loggedInUser;
        let likeArr = this.props.noteSearchSingleResult.score.likes;

        // Check if user is in likeArr
        if(!likeArr.includes(user)) {
            console.log("Did not find user")
            notesUpdateLikes(this.props.noteSearchSingleResult.topic,
                             this.props.noteSearchSingleResult._id,
                             this.props.loggedInUser,
                             "like")
            .then(()=> {
                 this.props.reloadNote(this.props.noteSearchSingleResult);
            })
        }
    }

    noteDislikeButtonClicked() {
        let user = this.props.loggedInUser;
        let dislikeArr = this.props.noteSearchSingleResult.score.dislikes;

        // Check if user is in likeArr
        if(!dislikeArr.includes(user)) {
            notesUpdateLikes(this.props.noteSearchSingleResult.topic,
                             this.props.noteSearchSingleResult._id,
                             this.props.loggedInUser,
                             "dislike")
            .then(()=> {
                this.props.reloadNote(this.props.noteSearchSingleResult);
            })
        }
    }


    // Function for custom css styling
    // https://draftjs.org/docs/advanced-topics-block-styling

    myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if(type === 'code-block') {
            return 'editorCodeBlock';
        }
    }

    // blockRendererFn is run every time a block is rendered

    blockRendererFn() {
        return {
            component: EditorLineNumber
        }
    }
    // Editor edit text

    toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    toggleStyleType(inlineStyle) {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }


    render() {
        return (
            <article className="noteEditor">
                <header className="noteReadHeader">
                    <h3>
                        {capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}
                    </h3>
                </header>

                <article    className="noteEditorMain"
                            >

                    <div className="editorUtilities">
                        <EditorBlockUtilities
                                    editorState={this.state.editorState}
                                    onToggle={this.toggleBlockType.bind(this)}/>

                        <EditorStyleUtilities
                                    editorState={this.state.editorState}
                                    onToggle={this.toggleStyleType.bind(this)}/>
                    </div>
                    <Editor
                                onChange={this.onChange}
                                editorState={this.state.editorState}
                                ref="editor"
                                blockStyleFn={this.myBlockStyleFn.bind(this)}
                                blockRendererFn={this.blockRendererFn}
                                spellCheck={true}
                            />
                </article>

                <footer className="noteReadFooter">

                    {((this.props.loggedInUser === "guest") ? null :
                     (this.props.loggedInUser === this.props.noteSearchSingleResult.author) ?
                         <button className="noteButton"
                                 onClick={this.saveContent.bind(this)}>
                                 Save
                         </button> :
                         <button className={"noteButton " + this.state.likeButton}
                                 onClick={this.noteLikeButtonClicked.bind(this)}>
                                 Like
                         </button>
                    )}

                    {((this.props.loggedInUser === "guest") ? null :
                     (this.props.loggedInUser === this.props.noteSearchSingleResult.author) ?
                         <button className="noteButton noteReadDeleteButton"
                                 onClick={this.deleteButtonClicked.bind(this)}>
                                 Delete
                         </button> :
                         <button className={"noteButton " + this.state.dislikeButton}
                                 onClick={this.noteDislikeButtonClicked.bind(this)}>
                                 Dislike
                         </button>
                    )}

                    <button className="noteButton">

                            Bookmark
                    </button>
                    <button className="noteButton"
                            onClick={this.commentButtonClicked.bind(this)}>

                            Comments
                    </button>
                </footer>

                {(this.state.showComments && this.props.showDictionary === false) ?
                    <NoteComments noteSearchSingleResult={this.props.noteSearchSingleResult}
                                  updateSearchSingleResult={this.props.updateSearchSingleResult}/>
                : null}
            </article>
        )
    }
}
