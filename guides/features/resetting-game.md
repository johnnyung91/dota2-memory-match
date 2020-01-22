Instructions - Resetting Game
--

### Overview

In this feature, you are resetting the game.
  - To do this you must:
    - Reset the stats to their original values
      - Except for `games played`, that must be incremented every time the game is reset
    - Return the cards to their original state
      - This means all logo cards are hidden and the `lfz-card` images are shown

### Feature Set

1. In your `script.js` file, declare a new function in the global space, `resetStats`.
2. The function should reassign all the variables used to track stats back to `null`.
   - `matches`
   - `attempts`
3. Resetting the game counts as completing the game.
   - Increment the `games_played` variable, by `1`.
4. Use your previously created function, `displayStats`, to update the DOM for the recently modified stat variables.
5. Additionally, select all the cards that are on the page and flip them back.
    - The `lfz-card` images should be showing.
    - You will want to remove the `hidden` class on all cards to set them back to their original states before the game was played.

### Design Docs

#### Game Reset

![Resetting Game](../feature-gifs/reset-game.gif)

### After The Final Feature

- When your Memory Match is complete, you will want to save and submit your work to the branch that you have created, and then open a pull request on the Learning Fuze Memory Match repository for review (***Instructions for submission are below!!!***).
  - Use `git status` to check that you are on the correct branch that represents your feature.
  - You will want to **add**, **commit**, and **push** the code that you have written to the appropriate Github repository.
    1. `git add .`
    2. `git commit -m "Description of the feature that you have implemented"`
       - e.g. `git commit -m "Added simple HTML skeleton"`
    3. `git push origin FEATURE_NAME_HERE`
       - e.g. `git push origin skeleton`

- Finally, you will want to create a pull request. This will merge the code from your newly **completed** feature branch into your `master` branch.

  1. Navigate to <kbd>New Pull Request</kbd>:
  ![Navigate to pull requests](../post-feature/navigate-to-pull-request.gif)
  2. Compare changes to merge:
  ![Compare changes to merge](../post-feature/compare-changes.gif)
  3. Create a new pull request:
  ![Create new pull request](../post-feature/create-pull-request.gif)
  4. Merge the pull request:
  ![merge pull request](../feature-gifs/merge-request.gif)
  5. Update master with the new changes:
  - Note: you must `checkout` to the `master` branch and then `git pull origin master` to update your local `master` branch with the new code you just merged into the remote `master` branch.
  ![Update master](../post-feature/pull-new-changes.gif)
  6. Create a pull request from your `feature` branch to the `student-reviews` branch and send the pull request to your lead instructor in Slack.
    - You will be deleting this branch only `AFTER` your pull request has been approved!
![pull request from master](../post-feature/pull-request.gif)
  7. Go back to [Features](../../README.md#features), if you're still working through the project.

  ### How to turn in your project for review!


- Once you have merged your final version of the Memory Match game onto your master branch, you will be turning it in for Review from the senior class.
  - On Github, and from your Memory Match Repository:
    - Create a new pull request
    - Make that pull request from your "master" branch to the "student-reviews" branch on the Learning Fuze Memory Match Repository.
