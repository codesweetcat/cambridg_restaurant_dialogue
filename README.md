# Clone project && Install dependencies

`git clone -b master https://github.com/sstoyanchev/exp_web_ui.git.`
`npm i`

## In the project directory, you can run in local:

`npm start`

Runs the app in the development mode.\
Open text version: [http://localhost:3000/dialogue/exp_text?workerID=abcd1234&taskID=Task1&expCond=B] to view it in the browser.\

Open speech version: [http://localhost:3000/dialogue/exp_voice?workerID=abcd1234&taskID=Task1&expCond=B] to view it in the browser.\

### Deploy on woc-7

Run `npm run build` to builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\

Copy-paste ALL files from `build` folder to woc-7 /var/www/html/dialogue \
Level up premisson : chmod -R 755 ./dialogue/
