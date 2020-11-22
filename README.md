# COMP 426 Final Project 

## Developing

To run, just type `npm run dev` or run the dev server with `node ./server.dev.js`. The server will use port 3000 by default, but if you want to use another port you can define an environment variable called `PORT`.

The dev server currently supports automatic refresh of styling, but not React components, so when you make a change, you'll have to refresh your browser window.

## Building and Running

Type `npm run build`, which will run webpack and put all the bundled files in `client/dist`. You can serve these by running `server.js` in node (which is literally what Heroku will do), but any changes you make to the project won't be reflected until you run another build.

## Structure

The way it's currently set up, there's a pages folder in `client/src` where each file in pages is a react component for a full page. To add a page, you have to 

 - Create a file in `client/src/pages` and export a React component
 - Add the component to the router in `client/src/App.js` (there are instructions in there too)

 Components are in `src/components`, and have css modules. The `FancyButton` component has some comments on how to use. To add a component with style:

 - Create a file in `client/src/components/[name].js` and export a React component from it
 - Create a css module file in the same directory, using the same name like `components/[name].module.css`
 - Import the module into the component file
 - For non module style, just import them without naming them, e.g. `import './blah/blah.css'`. The global stylesheet is already available across all components, since it's imported in the root `App.js`

 ## API Documentation
    
- /countydata
> Retrieves data from NYT that includes, statistics from todays date about every county in the US in 
> regards to a counties number of cases, deaths, confirmed cases, confirmed deaths, probable cases and 
> probable deaths. Also includes the counties corresponding fips code.
 
