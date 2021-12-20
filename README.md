Chaton app connects to MySQL database.

Xampp should be downloaded.

Php files in the DB package should be copied to this location:
C:\xampp\htdocs\react-mysql

A database should be created as "chaton"

Then these CREATE TABLE sql codes should be run.

CREATE TABLE `person` (
`phone_num` char(12) COLLATE utf8_turkish_ci NOT NULL,
`name` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
PRIMARY KEY (`phone_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci

,

CREATE TABLE `message` (
`id` int(11) NOT NULL,
`text` text COLLATE utf8_turkish_ci NOT NULL,
`date` datetime NOT NULL,
`sender_num` char(12) COLLATE utf8_turkish_ci DEFAULT NULL,
`receiver_num` char(12) COLLATE utf8_turkish_ci DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `fk_sender` (`sender_num`),
KEY `fk_receiver` (`receiver_num`),
CONSTRAINT `fk_receiver` FOREIGN KEY (`receiver_num`) REFERENCES `person` (`phone_num`),
CONSTRAINT `fk_sender` FOREIGN KEY (`sender_num`) REFERENCES `person` (`phone_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci

Now our database is set.

After being sure that paths in react app direct to the right paths,
we can run our React app.

I used WebStorm IDE by JetBrains and recommend running this application
using WebStorm. 

The project can directly be cloned into WebStorm by get from VCS at the start.

Then the run button starts the project.

After running the project http://localhost:3000/? will open

-- DEFAULT REACT READ.ME -- 

Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


