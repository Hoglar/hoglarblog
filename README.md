# hoglarblog


Hello

The hoglarblog repo is where hoglar.com is getting created. Im a guy that is learning how to code on my free time and this project is kinda my practice area. I am very glad if someone wanna commit or just chat ! :)

Hoglar.com is made to be a helpfull learning platform. I want to make a simple page with some functionality. Right now i got 7 different apps i want to implement, some stand alone but in some way i think they all will talk together.

1. Notes When writing in notes, i should have some sort of functionality so i can mark a word, press a button and then it 2 gives me a dictionary explanation.

2. Dictionary:
    The dictionary:
    The dictionary needs two parts, i need the front end user interface, and i need the backend database with the saved data.

    What is the dictionary ment to be?
    In its simplest form the dictionary should be a place to look up words in given tech that you need a short explanation of. Often a short description is not enough for understanding of a topic, thats fine and dictionary is not ment to give good explanations on complex topics. But, when reading other good articles on complex topics, it could be nice to have a place to turn to when reading for that one word you dont understand. I also want some basic syntax to be shown if its appropriate. Like short description of a function and then how to write it propperly. Lastly i want a link to a resource for more info on the word.



    So those three things:
        1. Short explanation of a words meaning.
        2. Short note of how to use it in code.
        3. Link to another resource on given topic.

    If you have a user, you should be able to make your own dictionary.
    When learning i think its usefull to write down short notes, this is notes i understand myself and maybe what i want to look up later. This is how i want to populate my dictionary database. Just users making notes.

    If you made the description of given topic that must be easly accesable for you. But i also want the dictionary to find the best descriptions and give that to you as a user aswell. Maybe you should be able to toggle "your dictionary" and "top rated dictionary". Maybe you also could follow other users dictionary.

    Front end:
        The front end is buildt with React. i now make the top field to be where we select what kind of language we are talking about, or what tech. Maybe when pressing the dictionary button this is the only thing that shows. Then we press one tech we render the search bar, and then when we get an answer we render the main page where we have the description, use and reference.
        Under this we need some buttons.

        language/tech:
            This can be large i guess. I will only make the ones im learning for starter. But it may not be hard to expand.
            This is the ones i want:
                1. Javascript
                2. HTML
                3. css
                4. MongoDb
                5. Math

            I think i will put React and node in under Javascript.

        If you press one topic, you should get a search bar where you can enter given word. you should then get back one answer. this answer will give you a doescription on the word, how to use it and a refference to more info.

        In settings i will make some options on how the app returns your one answer. But my thoughts are like this.
        You can choose to get your own answers back or the best if you didnt have one saved. or you could chose only the best answers.


            Placement of the app:
                Im not quite sure where it should pop up when the dictionary button is pressed. but now its to the right, thats because you may be working with something left of it.

        MainSection:
            In the middle


    Back end:
        The backend database is mongodb. I use express to sett up the routes. I think i have something simlar to an rest api.


3. Ideas

4. Social I will not make a chat or message function(maybe later). This is because other options are way better i think. And i want the social piece of the site to be something else. I have played a lot of videogames, and the best ones is those who make you feel part of a community or a world. Some big mmorpg doesnt get this, and make a huge world full of players but where you feel youre playing alone. I want to make a feeling that your learning together with other people. You kinda need to be dependent on others maybe ?

I want to explore meritocracy, how do we decide wich posts are good and which deserve deletion.

5. Questions I want a way to easly ask questions kinda out in the air.
One idea is to make the question api a part of notes (maybe also some of the others). When writing notes you can easly put down a question. when someone reads you notes they may get a good feeling of what your asking about since the question comes with a context. Then they can in the notes answer the question. This answer will then go to the users question section and the question api will light up.
6. Projects.
   I want to make a system where you can create small projects for yourself. Like 3 days of learning math, i then want to make a way to get points for this achievment. It will also be progressive. if you make a 3 day challange enough times, you can make it 5 days and so on. This will also help my site get returning players(users) :)

7. Checklist

8. Settings
