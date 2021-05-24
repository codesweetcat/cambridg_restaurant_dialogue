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

# System Overview

* Main app page is src/App.tsx
* User interface pages are implemented in containers (/src/components/Page/)
    * PageTextContainer - text dialogue with Mturk
    * PageSpeechContainer - spoken dialogue with Mturk
    * DemoContainer - dialogue with visualization displayed in the tabs on the right



# Frameworks used

* React .tsx files define components which are compiled into javascript
    * tutorial/resource ???
* Redux  - ??? what does it do
    * tutorial/resource ??? 
*  other ???

# Q & A

## Where in the code is the call to google api made?

## What are the steps to create a new GUI?

1. Make a copy of one of the containers (in /src/components/Page)
2. Modify src/App.tsx
3. Make changes to apache config for the new page

## What are the steps to create a new tab for visualizing in DemoContainer?

## Where is (will be) the code for uploading audio data?
