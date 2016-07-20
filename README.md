#Guidant Financial Test Tech Project
[https://josh-gfs-test.herokuapp.com/](https://josh-gfs-test.herokuapp.com/)

##Technologies Used
+ Full Stack
  * __PostgresQL__ and __Sequelize__, database
  * __Express__, back-end app
  * __AngularJS__, front-end framework
  * __Node.js__, server
+ Third Party Javascript Libraries
  * __Sweet Alerts__, for alerts
+ Third Party Stylesheets
  * __Bootstrap__, for quick styling
  * __Sweet Alerts__, for styling sweet alerts
+ Node Modules
  * __body-parser__, API message parser
  * __express__, back-end app
  * __path__, for serving public files
  * __pg__ and __pg-hstore__, for connecting to postgresQL
  * __sequelize__, ORM
  * __sequelize-cli__, for command-line migrations in remote deployments
  * __sequelize-fixtures, for seeding the database
+ AngularJS Modules
  * __ui.router__, state control with URL history
  * __googlechart__, pie chart canvas drawing
  * __ui.bootstrap__, required for modals
  	+ requires __angular-animate__ and __bootstrap__'s css

##Installation Instructions
1. Fork the repo from [github](https://github.com/joshgranadosin/chord-composer-magik)
2. Install the dependencies using `npm install`.
3. Install and run PostgresQL on your system.
4. Edit the config/config.json file to connect to your PostgresQL
5. Connect to a database by running `node_modules/.bin/sequelize db:migrate`
6. Run `node seed.js` to seed the database.
7. Open using `localhost:3000`

Note: You can open a working version on [heroku](https://josh-gfs-test.herokuapp.com/)

##Notes

###General Approach
This app was a test given by __Guidant Financial__ to screen applicants. They gave me some specifications and a couple of weeks to complete it on my own.

As with any app I decide to do, I started with planning. I don't touch code until I decide what tech I'd need or prefer to use. I decided to write __Node.js__ back-end because that's what I was most comfortable with for the short amount of time available, though I did consider __Ruby-on-Rails__ for it's speed. I went with __PostgresQL__ and __Sequelize__ thinking that a relational database would work when dealing with SYMBOLS, USERS, and PORTFOLIOS, though I also spent time thinking about how a NoSQL database like __MongoDB__ could also handle it. I used __Angular__ because I prefer using front-end templating when dealing with a lot of data. __Bootstrap__ and __Sweet Alerts__ were so I could do something quick and __googlecharts__ worked better than other libraries with __Angular__ for making charts.

###Remaining Issues
As was specified, I assumed that authorization and authentication was not a requirement. As it is, there's no password or token checking in the app. I've built that in my previous project so with time I can definitely add it in.

There's no sign up. There's no way to create new users using the app.

###Challenges
Most of the chart libraries I found did not work well with __angular__ or were not responsive enough. It took a while for me to land on __googlecharts__ and get it to do what I wanted.

