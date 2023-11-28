# afs-test

## Details

This is a Vue 2 project with TS using these libraries for component setup:
```vue-class-component```
```vue-property-decorator```

## Assignments

All the tasks are implemented.

### Update transfers button
The button was not working because we tried to update a reactive object without using the ```
this.$set ```. In Vue 2 if a reactive prop is not primitive  
the this.set method should be called and the updated object should be passed as a parameter.It's important to use this.$set when modifying properties within Vue components to maintain reactivity, especially when working with nested objects or arrays.

For more explanation please check this: https://v2.vuejs.org/v2/guide/reactivity.html

### Description

The cards are implemented according to the design but the colors the spaces and the fonts are different.
In real life I am getting Figma mocks to translate them to px. At least the grid is exactly the same. 

If I had the time I would refactor the css and I would make a kind of design system for colors , typography,
spaces and grids but unfortunately my time was a bit limited.

Also the modal should be accessible in the future according to WGAG framework.

Currently the entire ```buefy``` library imported and we use only the table. This have a big impact to the performanance
and incrase the ```First Contentful Paint``` and the ```Largest Contentful Paint```. Treeshaking should be applied before the app ship to production.


### table row
On the "Home" page is a table, add a row to this table that displays the totals of the other rows.

### Async/Await
In the mounted function the data for the table is being fetched, edited and placed in the tableData property with a promise chain. 
Rewrite this function but instead of chaining promises use async/await to do the exact same. 

### Add a security class
On the home page, create a button that opens a modal window containing a form. This form should allow you to add a security class to the table, updating the totals.

### Transfer search
On the Transfers page you find a list of financial transfers with a search bar. Make the transferlist searchable by "recordDate".

### Style the transferRow.vue component
Rework the style for this component, using this design. Make it look as close as possible.  
The texts in the design and the provided data do not match. It is just about recreating the design.
https://i.pinimg.com/736x/29/bc/e5/29bce59f6cdf71eb840d939ba05deff1--best-ui-design-app-ui-design.jpg 
If you for whatever reason do not have a similar result to the image, please let us know when you send in the work.

### Fix the update transfers button
Something is going wrong with this button, fix it and explain why it broke in the comments.

To hand in the project, please create a repository and invite mvanloon@afsgroup.nl and sarissen@afsgroup.nl.
Good luck!

## Notes
Do not use the included buefy UI components for your assignments.

We have tested this project to work with node 16.14.0 (it may work with other versions as well).


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
