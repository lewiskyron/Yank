# Contributing to Yank

Here is a simple guide to contributing to Yank. Please read it before making a pull request.

## Getting Started

To contribute to the project, follow these steps:

1. clone the respository to you local.
2. VsCode will suggest the a linter and formatter based on the project settings. Please install them.
3. create your branch from `main`.
4. If you've added code that should be tested, add tests.
5. If you've changed APIs, update the documentation.
6. Before pushing code ensure the test suite passes.
7. For linting and formatting we have setup the project to lint and format on every save so ensure you editor has autosave on.
8. If your code does not pass the tests or lint check(you will see this in the pull request), fix the issues.

## Branches

The naming convention for branch naming looks as follows:

```
ENG-TASK-ID/feature-name
```

**_Where ID is the task ID._**

Ensure to use the prefix **ENG-TASK-ID** since this is what we use to track tasks in notion for project management.</br>
To get the prefix create the task you are working on the notion page and copy the task ID.</br>
Here is a link to the notion page [Notion Project Management Page](https://www.notion.so/PRs-Project-tracking-99747e52760d46fdb46004d98ae0df7f)

## Pull Requests

### NOTE: NOTHING SHOULD EVER BE MERGED DIRECTLY TO MAIN EXCEPT IN VERY RARE CASES!

For the PR title use the following convention:

```
ENG-TASK-ID: Title of the PR
```

In your pull request, make sure to include a description of what you did. Use the template provided below. For front-end changes please include screenshots as well.

````markdown
Title: [Brief description of the change]

        ## Description

        [Provide a detailed description of the changes you have made. Explain what you have changed and why. If the PR addresses a specific issue or feature request from the issue tracker, include a link to that issue.]

        ## Type of Change

        - [ ] Bug fix (non-breaking change which fixes an issue)
        - [ ] New feature (non-breaking change which adds functionality)
        - [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
        - [ ] Tests
        - [ ] Documentation update

        ## How Has This Been Tested/ How others can test?

        [Describe the tests that you ran to verify your changes. Provide instructions so reviewers can reproduce. Please also list any relevant details for your test configuration.]

        ## Screenshots (if applicable):

        [If your changes have visual components, please add screenshots showing the affected pages.]

    ```
````
