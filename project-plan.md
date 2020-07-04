## Add Text

[x] Store a text in local storage.

[x] Add text to local storage (which then breaks it down into sections of 10).

[x] Refreshes when you upload new text (probably best to just have separate pages tbh)

[] Refactor and test this like crazy, it's very messy

## Quiz

[x] At first only show 10 words.

[x] Implement the algorithm, labelling each word as shown or not.

[x] Click on a word to reveal it.

[x] Mark it as right or wrong, and store result.

[x] If all right, go up a level, if wrong,stay on same level and store word as a problem area.

[x] Next 2 times, that word should be one of those faded out.

[x] Once you reach level 3, on all sections, (and get them all right), you get the next set of words.

[x] when you get a word right, it removes it as a problem word if you get it right

[x] Generate a percentage score of text memorised

[x] Can only do it once an hour.

## Algorithm

What this means
a) Get all the sections which are 3 or above (and the one after)
b) Each level apply the hiding on the relevant percentage
c) Click to reveal and then, tick or cross as is relevant
d) if all are right in a section,

## Levels

1 - 20% of words missing
2 - 30%
3 - 50%
4 - 75%
5 - 90%
6 - 100%


## Then - refactor, tidy up, organise and style

- Better way to do than have lots of little stateful components? Parent controls state?

- Min width for missing words

- extract and tidy components and add tests

- Deploy so I can start learning

## Longer term

1 - voice detection?
2 - clumping words together
3 - bias to longer words
4 - Ability to have multiple texts