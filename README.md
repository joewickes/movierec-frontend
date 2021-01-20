# MovieRec

## Live Link: https://movierec-frontend.vercel.app/

## Table of Contents
- [Summary](##-summary)
- [How To Use It](##-how-to-use-it)
- [Technologies Used](##-technologies-used)

## Summary
MovieRec is an app that lets you recommend movies to family, friends, or strangers! 

As a user you can:
- Search for movie titles by keyword
- Filter the top-rated movies for each genre
- Sign up for an account which lets you 
  - Log In
  - Upvote on already recommended movies
  - Downvote on already recommended movies
  - Take away your previous vote on already recommended movies
  - Add movie titles to our database (so that only one person can get the pride of recommending a movie for the first time)
  - Add movie recommendations yourself
  - Log out of your account


## How To Use It
We are going to create a demo user to walk through a traditional use of the app, so pay attention to the "USER" blocks to see what we are doing next!

![Home Page](./src/images/SS1.png?raw=true "Title")

Everyone starts out on the home page displaying: 
- A MovieRec logo in the top left (that will always return you to this page when clicked)
- A Log In button for returning users
- A Sign Up button for new users
- Some instructions for how to get started
- A list of our most recently recommended movies

USER - User is new, so we are clicking 'Sign Up'. We still have the option to search or filter through options even when not logged in, but we'll show that later!

![Sign Up Page](./src/images/SS2.png?raw=true "Title")

On the sign up page we are entering:
- A username (which will tell us if someone already has that username)
- An email (which has to follow the something@something.something format)
- A password of at least 8 characters including an uppercase letter, a lowercase letter, a special character, and a number
- The exact same password as before

USER - user submits all the correct information and clicks on the 'Sign Up Now' button


![Log In Page](./src/images/SS3.png?raw=true "Title")

On the Log In Page we are:
- Providing an existing username
- Providing a matching password for that username

USER - user just input all of this information, so re-typing once more and hitting the 'Log In' button will move us along!

![Logged In Home Page](./src/images/SS4.png?raw=true "Title")

Successfully logging in will divert us to the Home Page again, with some slightly different features 
- The 'Log In' and 'Sign Up' links in the top of the header have been replaced with an 'Account' link (that we can use to log out later)
- The instructions for first-time users have disappeared
- A 'New Rec' button appeared that enables the user to now submit new movies and recommendations
- The user now has the ability to upvote or downvote (or be neutral) on any of the former posts. The upvote/downvote buttons toggle, so if the user hits upvote and then upvote again, the value will return to its original state, undoing the previous upvote made by said user.

USER - user tests out upvoting and downvoting and decides to try out what it's like to make a 'New Rec' and clicks the 'New Rec' button

![Add a Recommendation Page - Search Posts](./src/images/SS6.png?raw=true "Title")

Moving into adding a recommendation will involve a couple prompts, which we will explore together.

All that is needed on this screen is a keyword (or the entire title) of a movie that we want to recommend.

USER- user wants to recommend the movie 'Aladdin' for other people to watch, so user types Aladdin in and clicks the 'Search' button

![Add a Recommendation Page - Select Existing Movie](./src/images/SS7.png?raw=true "Title")

On this page, we have the option to select from a list of movies that exist in the database. If we don't see the right movie, we can add a new one with the 'Add a Movie' button.

USER - user doesn't see the right movie, so user clicks on the 'Add a Movie' button.

![Add a Recommendation Page - New Movie Form (Aladdin)](./src/images/SS8.png?raw=true "Title")

On this page, we can submit our new movie. we need to supply:
- A title
- A year (yyyy format)
- The closest matching genre from the dropdown list
- Whether we want to recommend it now or not (either option will return us to the Home Page, but if we recommend it, we will see our new post at the top of the page with an automatic upvote from us as the user)

USER = user puts in all of the pertinent information for Aladdin and decides that they want to recommend it immediately, so they click on the 'Submit' button

![Home Page - With our New Post](./src/images/SS9.png?raw=true "Title")

Here we can see that we did it! We successfully submitted a movie, submitted our recommendation of it, and came back to the Home Page! Next we are going to try it another way. We are going to go through all the same steps (seeing one of the situations we run into if no movies exist with a particular title), but this time, we are going to say no, we don't want to recommend it.

USER - user starts another 'New Rec' for The Lion King and goes through the process until they reach the Home Page again, this time WITHOUT any vote, because we said no. See the flow of all of this below.

![Add a Recommendation Page - Search Posts](./src/images/SS10.png?raw=true "Title")

![Add a Recommendation Page - No Existing Movie Found](./src/images/SS11.png?raw=true "Title")

![Add a Recommendation Page - New Movie Form (Lion King)](./src/images/SS12.png?raw=true "Title")

![Home Page - No New Posts](./src/images/SS13.png?raw=true "Title")

Awesome! Now we are going to see how to recommend a movie that exists in a database.

USER - user again clicks on the 'New Rec' button

![Add a Recommendation Page - Movie Found (Lion King)](./src/images/SS14.png?raw=true "Title")
![Add a Recommendation Page - Movie Found (Lion King)](./src/images/SS15.png?raw=true "Title")

After searching for The Lion King again, a matching movie shows up. Selecting it will change its color to yellow, showing us that it is selected.

USER - user selects the right movie and clicks on the "Submit" button

![Add a Recommendation Page - Final Submit (Lion King)](./src/images/SS17.png?raw=true "Title")

This takes us to the official recommendation page. All we have to do is make sure that the title and year match the movie, submit and we will be redirected back to the Home Page with our new recommendation on top with a single upvote again! As before, if we decide for whatever reason to not recommend the movie at this point, we will just be redirected back to the Home Page as before!

USER - user selects yes and submits

![Home Page - With New Post (Lion King)](./src/images/SS18.png?raw=true "Title")

We can see that it worked and we are back on the Home Page!

Now we want to try and submit a movie that already has been recommended. We start a new rec, move through the process again, and end up with a different screen that just prompts us to look up that movie on the main page (that we can get to from the MovieRec logo in the top left)!

USER - user wants to submit Jurassic Park, but doesn't know that it's already been suggested. User goes through all the steps, and winds up at a screen telling them to go back to the Home Page, so they click on the logo and return to the Home Page.

![Add a Recommendation Page - Select Movies(Jurassic Park)](./src/images/SS21.png?raw=true "Title")

![Add a Recommendation Page - Final Submit Already Exists (Jurassic Park)](./src/images/SS22.png?raw=true "Title")

![Home Page - No New Content](./src/images/SS18.png?raw=true "Title")

As we can see, we came back to the Home Page with the same screen as before with the Lion King. We can either search for that last movie (like we were just prompted to), search for another one, or sort by genres. First we are going to search for a movie.

![Home Page - Searched for Aladdin](./src/images/SS23.png?raw=true "Title")

All we have to do here is search a movie by keyword (in the title), and we will see a list of movies that match that search!

USER - user enters a search for a post they know already exists: 'Aladdin.' After hitting enter, they get back a list of movies containing the word 'Aladdin.'

Next, we are going to try a filter.

![Home Page - Filtered by Action](./src/images/SS24.png?raw=true "Title")

All we have to do here is select the genre that we want to see recommendations of, and we will get a list of the top rated movies in that genre!

USER - user clears out their search and selects 'Action' from the dropdown list, getting back posts of the top rated movies from that genre.

Lastly, once we've done our recommending for the day, we want to log out.

![Home Page - Selecting Account](./src/images/SS19.png?raw=true "Title")

![Log Out Page](./src/images/SS25.png?raw=true "Title")

All we need to do here is hit the 'Account' link in the top right, and then the 'Log Out' button on the following page and we are logged out and redirected back to the Home Page (without our ability to upvote or add any recs)!

USER - user goes to the account page, enters the log out page, and clicks 'Log Out'.

That's it! You now know how to use MovieRec from beginning to end!

## Technologies Used
- Bcrypt JS
- React
- React Context
- React DOM
- React Router DOM
- Bootstrapped with create-react-app
- Deployed using Vercel

