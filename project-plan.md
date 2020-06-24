## Refactoring work

[x] Extract single card view to separate component

[] Add unit tests for the 3 reducers

[x] Extract the reducers to separate files

[] Work out how directing to different pages could work - and how to use context to select which card is currently viewed

## Features

[] Mark as wrong

   [x] Sets next day tomorrow

   [x] Sets incorrect count + 1

   [x] Should it be a chain of incorrect? Or incorrect events?

   [] Gives you an option to re-review wrong cards

[] Mark as right

   [x] Sets next day based on formula

   [x] Sets correct count + 1

   [x] Sets incorrectCount to 0

[] Mark as paused

   [] sets paused to true

   [] doesnt change anything else

[] Add new cards

   [] Id is plus one to the length

   [] correct and incorrect are set to 0

   [] can review today

   [] Only shows once you've completed your daily review (including paused cards)

   [] Limits you to 10 cards for tomorrow total

[] Store card data in local storage

   [] On load, get data from storage

   [] On dismount, store data

[] Write brief guide to site

   [] What each part means

   [] Routing to pages

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
Right - 1 day, 3 days, 5 days, 7 days, 1 month, 3 months

Add new card - only if 15 or lower are happening tomorrow
Show count of remaining cards

card  = {
    number: ,
    correct-chain: ,
    next-day: date,
}

new - adds a card for tomorrow

