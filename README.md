# 🍴 What's Cookin'? 🍴️

## Abstract
What's Cookin'? is an interactive, web-based application that allows users to view a list of recipes they want to cook and plan their meals and shopping trips accordingly. Using HTML, CSS, JavaScript, and APIs, we built our app to allow users to view recipes, filter recipes by tag, search recipes by name, and save their favorite recipes in a single place. Users are able to filter recipes and search for recipes by name on their favorites page as well. When a user clicks on any recipe, they will be provided with a list of ingredients with their quantities, an estimate of the total cost to make this recipe, and step-by-step instructions for cooking.

## Preview of Application
![Brief features gif](https://media.giphy.com/media/V4bSMD3CFTpIQhFgDd/giphy.gif)

## Installation Instructions
1. This website fetches data from an API, so you will need to clone down and run `git clone github@github.com:turingschool/What-s-cookin--starter-kit-API.git`.
2. `CD` into that directory, run `npm install`, and then `npm start`. You should see "What's cookin-starter-kit API so now running at http://localhost:3001/".
3. In a NEW terminal tab, `CD` to a directory outside of the API directory you cloned down to perform the subsequent steps. Do not close the terminal tab running the API.
3. In your new terminal tab, clone [this repo](https://github.com/Eleanorgruth/whats-cookin) to your local computer.
4. `CD` into that directory, run `npm install`, and then `npm start`. You should see "Project is now running at http://localhost:8080/"
5. Copy and paste the link that appears in your terminal in your browser.
6. `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.

## Context
What's Cookin'? is a two-part group project that is completed during Weeks 2 and 4 of Module 2 at Turing School of Software Development and Design. We worked as a team of four, implementing mob coding, driver-navigator paired coding, and some independent coding. Part 1 took us approximately 60 hours to complete. We used a thorough DTR, calendaring, GitHub project board, daily stand-ups, and the GitHub workflow to communicate while balancing project work with our full-time coursework and working across multiple time zones. The spec for this project can be found [here](https://frontend.turing.edu/projects/whats-cookin-part-one.html).

## Contributors
- Lauren Frazier [GitHub](https://github.com/FrazierLE) | [LinkedIn](https://www.linkedin.com/in/lauren-frazier-745053188/)
- Keyaanna (Kiko) Pausch [GitHub](https://github.com/knpausch) | [LinkedIn](https://www.linkedin.com/in/knpausch/)
- Eleanor Ruth [GitHub](https://github.com/Eleanorgruth) | [LinkedIn](https://www.linkedin.com/in/eleanorgruth/)
- Jennifer Yacoubian [GitHub](https://github.com/jmyacobn) | [LinkedIn](https://www.linkedin.com/in/jennifer-yacoubian/)

## Learning Goals 🎯
- Implement ES6 classes that communicate to each other as needed
- **Use object and array prototype methods to perform data manipulation**
- Create a user interface that is easy to use and clearly displays information.
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- **Implement a robust testing suite using TDD**
- **Make network requests to retrieve data**

## Technology Used 💻
HTML | CSS | JavaScript | Figma | Webpack | API | Mocha and Chai | Chrome Dev Tools | GitHub Project Board | Lighthouse Accessbility

## Wins 🏆
### Part 1
- Built fully functional site to meet the MVP outlined in the project spec
- Successfully learned and implemented API fetch calls
- Highly successful team collaboration due thorough DTR, calendaring, and Agile/Scrum workflow
- Learned to use Figma to design our website and GitHub Projects to manage our work as a team

## Challenges 😅
### Part 1
- Deleting recipes from our saved recipe view with a double click, while using a single click to view recipe details
- Initially, accessing the data in our fetch calls

## Future Features
- Allow users to select multiple tags on both the home and saved recipe views
- Allow users to customize the recipe details by choosing a serving size
- Allow users to rate recipes and leave comments
