**This application was made using React and Less.**

## To be executed, follow the instructions.

**Run in the console / terminal:**

If you doen't have NodeJS already installed:

**MacOS:** `brew install node`

**Windows:** download and install NodeJS here `https://nodejs.org/en/#download`

**Linux:** `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - sudo apt-get install -y nodejs`

*Run `node -v` for check if node was installed.*

**Now we can proceed:**

`git clone https://github.com/AgustinQuetto/birthday-excercise.git`

`cd birthday-excercise`

`npm install`

`npm install -g less`

`lessc src/less/app.less src/css/app.css`

`npm start`

For build: `npm run build`

*Now, automatically will be open a tab in the browser at the address: http://localhost:3000*

**Languages/translations**

 - Spanish: http://localhost:3000/es
 - Portuguese: http://localhost:3000/br
 - English: http://localhost:3000 or http://localhost:3000/en

**Get list of previous visitors:**
Go to http://localhost:3000/revisited and enter 123

**Features:**
Entry of users, calculator of years, translations, react components, await async, callbacks from child to parent, less, previous users are saved in local storage, npm build, responsive flex css features, fetching way, If a row is clicked on one of the previous visitors, it redraw the legend of the greeting.



Trello: https://trello.com/b/fb6y3OQn/intive-fdv-birthday-excercise