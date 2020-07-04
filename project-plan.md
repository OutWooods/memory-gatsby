## Refactoring work

[x] Extract single card view to separate component

[] Add unit tests for the 3 reducers

[x] Extract the reducers to separate files

[] Work out how directing to different pages could work - and how to use context to select which card is currently viewed

[] Move some key definitions to separate files and add tests to those

[] Setup jest (or look at what gatsby does for testing)

[x] Extract actions out into enums

[] Improve index page logic (break to separate pages)

[] Is there any ways of using Gatsby Better?

[] Find more efficient way to store in local storage

[] Go back to main project and update gatsby

## Features

[] Show card numbers you need for today before quiz

[x] Mark as wrong

   [x] Sets next day tomorrow

   [x] Sets incorrect count + 1

   [x] Should it be a chain of incorrect? Or incorrect events?

[x] Mark as right

   [x] Sets next day based on formula

   [x] Sets correct count + 1

   [x] Sets incorrectCount to 0

   [x] Mark last attempted at as today

[x] Mark as paused

   [x] sets paused to true

   [x] doesnt change anything else

[x] Gives you an option to re-review wrong cards

   [x] Store method that decides if cards are done in state

   [x] Rename re-review to practise

   [x] Once you've practised once, the cards go away for the day

   [x] Practising changes nothing about the cycle

   [x] Wrong cards only appear 2 hours after getting them wrong

   [x] secondAttempt clears on the next day

[x] Add new cards (page created)

   [x] Id is plus one to the length

   [x] correct and incorrect are set to 0

   [x] Only shows once you've completed your daily review (including paused cards)

   [x] Limits to 10 new cards a day

   [x] (if you try to add when there's more than 10 in total tomorrow, it'll warn you)

[x] Tells you how many cards you currently have for tomorrow

[x] Add choice between adding new cards and practising wrong ones

[x] Store card data in local storage

   [x] On load, get data from storage

   [x] On update, store data

[x] (test this data is separate between prod and local)

[x] Quickly input old cards

[x] check for bugs

[x] Bug with wrong history cards showing

[] Better format for message of cards tomorow (and give the numbers)

[] Add better url for site

Now do all the refactoring and testing - ESP TESTING

-- Alpha Trial

[] Add a graphing library to show data on cards

[] Show current card plan for week (and following months)

[] Set one big review day (or choices of algorithm)

[] Write brief guide to site

   [] What each part means

   [] Routing to pages

[] If someone gets something wrong multiple times in a row - e.g. 3 times, suggest doing a hint

[] Can always just check wrong cards

[] Max new cards is toggabled, after a few days

[] Max cards in a day is toggable after a few days

## Questions

1. How do you keep data persisting between pages? (context?)

## Future ideas

1. Properly tracking events

2. Guides

3. Tips at different stages - hints

4. Tips on making good cards

5. Tags

6. Stats page - where everything is

## Random notes

-- Algorithm

Wrong - Show tomorrow
Right - 2 day, 3 days, 5 days, 7 days, 1 month, 3 months

Add new card - only if 15 or lower are happening tomorrow
Show count of remaining cards

card  = {
    number: ,
    correct-chain: ,
    next-day: date,
}

new - adds a card for tomorrow


## Tags