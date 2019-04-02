'use strict';

const express = require('express');
const morgan = require('morgan');
const store = require('./playstore.js');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send('yo');
})



app.get('/app', (req, res)=> {
    const {sort, genres}= req.query;

    let results = store;


    // sort the list by either rating or app, any other value results 
    // in an error, if no value provided do not perform a sort.
    
    if(sort !== undefined){
        
        //validate values
        if(sort.toLowerCase() !== 'rating' && sort.toLowerCase() !=='app'){
          return res.status(400).send('Can only sort by rating or app');
        }
        // sort by rating , descending order
        else if(sort.toLowerCase() === 'rating'){
          results.sort((a,b) =>  b.Rating - a.Rating);
        }
        // sort alphabetically ... is there not a simpler way?
        else if(sort.toLowerCase() === 'app'){
                results.sort(function(a, b) {
              if(a.App < b.App) { return -1; }
              if(a.App > b.App) { return 1; }
              return 0;
            });
          }
    }
    ///filter by genres
    if(genres !== undefined){
        
        //validate values
        if(genres.toLowerCase() !== 'action' && genres.toLowerCase() !=='puzzle' && genres.toLowerCase() !== 'strategy' && genres.toLowerCase() !== 'casual' && genres.toLowerCase() !=='arcade' && genres.toLowerCase() !== 'card'){
          return res.status(400).send('can only filter by Action,Puzzle,Strategy,Casual,Arcade,or Card');
        }


        results = store.filter(item => {
        //   return item.Genres.includes(genres.charAt(0).toUpperCase() + genres.slice(1)); 
          return item.Genres.toLowerCase().includes(genres.toLowerCase()); 
        });
      }

    res.send(results);
})

module.exports = app;
