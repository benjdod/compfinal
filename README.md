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
    
- `/countydata [GET]`

> A get request retrieves data from NYT that includes, statistics from todays date about every county in the > US in regards to a counties number of cases, deaths, confirmed cases, confirmed deaths, probable cases and 
> probable deaths. Also includes the counties corresponding fips code. The return type is a json object.
> Possible error code of 500 if the source could not be loaded.

- `/statedata [GET]`

> Uses the same NYT data that /countydata retrieves but instead of statistics by county returns a json object
> that has statistics by state.
> Possible error code of 500 if the source could not be loaded.

- `/countypops [GET]`

> Returns a json object that gives the population for every US county, data is retrived from the census.
> Possible error code of 500 if the source could not be loaded.

- `/statepops [GET]`

> Returns a json object with the population of each US state, data is retireved from the census.
> Possible error code of 500 if the source could not be loaded.

- `/querylatlon [GET]`

> Takes two parameters that are url encoded lat and lon both which represent latitude and longitude. 
> The response is a json object that has information regarding the county, state, country, and fips
> of that certain latitude and longitude.
> Possible error code of 400 if the lat and lon fields are not valid in the url. 
> - ?lat=34.585&lon=-79.012 (good parameters)

- `/calculaterisk [GET]`

> Calculates a risk number given a json object of input data from our quiz.
> Fields of this input object include,
> - latitude: float 
> - longitude:float
> - eventsize: int 
> - eventduration: int 
> - eventOutside: boolean 
> - maskWearing: boolean
> - maskPercentage: boolean
> - userMaskWearing: boolean
> - socialDistancing: boolean  
> Possible error code of 500 if any of the fields are wrong or cannot calcluate a risk number. 

- `/statesgeojson-base [GET]`
> Returns a geojson file of US states.
> Possible error code of 500 if the file could not be retrived.

- `/statesgeojson-loaded [GET]`
> Returns a geojson file of US states with covid data 
>fields added under the 'properties' field of each feature.



 
