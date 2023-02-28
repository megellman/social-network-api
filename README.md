# Social Network API

![license badge](https://img.shields.io/static/v1?label=license&message=MIT&color=blue)

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Git | [git-scm.com](https://git-scm.com/)     |    
| Node.js | [nodejs.org/docs](https://nodejs.org/docs/latest-v16.x/api/) |
| MongoDb | [mongodb.com](https://www.mongodb.com/docs/atlas/)|
|Mongoose | [mongoosjs.com](https://mongoosejs.com/docs/index.html)|
| Express.js | [expressjs.com](https://expressjs.com/en/guide/routing.html)


## Description

[Demo Video](https://watch.screencastify.com/v/RcRkcngeCVjdVHvnyDVL)
    
This project is a social network api. Users can create new users, thoughts, and reactions. They can also delete, update, and read them as well. I did this project to gain experience with the MongoDb and Mongoose. 

  ## Table of Contents
- [Social Network API](#social-network-api)
  - [Technology Used](#technology-used)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Code Example](#code-example)
  - [Usage](#usage)
  - [Author Info](#author-info)
    - [Megan Ellman](#megan-ellman)
  - [License](#license)
  - [Questions](#questions)

## Code Example

```
createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
        !thought
            ? res.status(404).json({
                message: 'Reaction created, but found no thought that that ID',
            })
            : res.json({ message: 'Reaction created!' })
    )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}
```
Here I created a controller to create a reaction. Since I did not create a model for reactions, only a schema, I could not use a query to create a new reaction. Instead, I queried to find a specified thought by its id and updated that the reaction with $addToSet. 

## Usage
  
This project can be used as a social network api.

## Author Info

### Megan Ellman

[LinkedIn](https://www.linkedin.com/in/megan-ellman/)

[GitHub](https://github.com/megellman)

[Portfolio](https://megellman.github.io/portfolio/)
    
## License
  
  This project is covered under the MIT license. For more information please click [here](https://choosealicense.com/)

## Questions

[GitHub](github.com/megellman)

If you have any additional questions, you can reach me at meganlellman@gmail.com