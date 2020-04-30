# photo-sharing-app-Backend

This app supports real-messaging and notifications

Built with
- Nodejs
- Expressjs
- MongoDb
- Graphql Dataloader
- Apollo Graphql Server
- Images stored in cloudinary cloud service

[Demo](https://instaphotos.netlify.app)

## Features of the app
- Ability to share photos by a user
- Ability to like a photo
- Ability to comment on photos
- Real-time comment (every new comment is seen by all logged in users)
- Real-time time notification

## Challenges
- Implementing relay-style cursor pagination
- Saving images to a cloud service
- Proper usage of Graphql Dataloader

## Solutions
- ### Implementing relay-style cursor pagination
        Initially, I was naively encoding the mongoDb id of the last item of every result set into base64 (using js-base64 package)
        and returning it as the endCursor field. It worked at first, but failed to return the desired result each time I sorted the
        result by a different field other than the mongoDb id. 
        In other to fix this problem, I had to factor in the sortedBy field, sortOrder and the mongoDb id when encoding and 
        decoding the cursor. By so doing, the cursor was truly transparent and the right results were returned regardless of the 
        sorting fields.
- ### Saving images to cloud service
        Initially, the original plan was to use ImageKit cloud service for storing images uploaded my users. However, when it was
        time to implement this functionality, I realised that Apollo Graphql Server converts file uploads to Nodejs ReadStream. This
        was a challenge because ImageKit API does not have support for image uploads from Nodejs ReadStream. Having workded with
        cloudinary previously, I had to take a look at their API docs and saw an upload_stream method specifically meant for reading
        from ReadStream. Trying to integrate it was initilly hairy, but got it working eventually.
- ### Proper usage of Graphql Dataloader
        This was the most subtle, nerve-wracking, albeit easiest to fix challenge I faced while working on this project. So what 
        went wrong with Dataloader then? I can't believe I could make such mistake, really. I mean, I had watched Mr Lee B's 
        presentation on Dataloader, I had looked at the source code at some point, and yet I did forget in the heat of the moment.
        On the frontend, I realised that each time a user liked or commented on a photo, it reflected on the number of comments and 
        likes but after refreshing the page, the comment or like count went back to the original value. To make matter worse, when 
        I accessed my Database from MongDB Compass the new changes were recorded.
        
        I was completely confused at this point. In my quest to get a solution to this problem, I tried killing my server process and
        re-starting it again. Surprise! surprise!!, it worked!!! When I refreshed the frontend, the new changes reflected. At this 
        point, the only thing going through my mind was, 'what the heck is messing with my code? where did I get it all wrong?". At 
        some point I tried to convince myself that perhaps the problem would go away when the app was finally hosted online. Naive me!!
        However, even while deluding myself that it would all go away, I was still unhappy and didn't stop thinking about what could
        have gone wrong. I proceeded with the implementation of the rest of the frontend. Just one day, I didn't know how it happen,
        but I started suspecting my Dataloader module as a likely culprit to this problem. I had to take a hard look on the module and
        guess what I found? Well, I was stupidly exporting all my dataloader services as objects. Should I repeat it? I said, I exported
        the darn thing as OBJECT!!!.
        
        Well, if you are not familiar with the internals of Graphql Dataloader and the continuosly running single process nature of
        Nodejs, this revelation I just made might not make any sense to you. My pleasure to put you in the know. 
        Firstly, Nodejs server (just to be more specific) is a continuously running single process which exits in the event of uncaught
        error or unhandled promise rejection, else it just continues to run and handles requests from users. On the other, Graphql 
        Dataloader makes use of in memory cache (HashMap) to perform caching for query results and doesn't perform cache invalidation
        automatically. In other to overcome this limitation (don't know if it's actually a limitation), a developer is expected to 
        use a new instance of Dataloader per request. SINGLETON is a big NO!!. Unfortunately, I ended up with Singletons in my case,
        this is because I exported my dataloader services as objects which were not request-scoped but alive in the memory as long as 
        the Nodejs process runs. Consequently, each time I made request to the server, I always got the results in the cache regardless
        the new changes made on the frontent. How was I able to fix this problem? Very simple, the next paragraph got you covered.
        
        Well, in order solve the problem I wrapped my dataloader service objects in functions. Simple trick. So for every request,
        instead returning already existing object in memory by reference, my wrapper functions are run and fresh instances of the 
        dataloader services are returned and everyone is happy. You might ask, what about the old ones, what becomes of them? Well,
        our very good old friend, garbage collector, will take care of them when the time is right. You got nothing to worry about.
        
        The end!!!
        
[frontend source code](https://github.com/iammrsea/photo-sharing-app-Frontend)

You can clone or download the repo and modify the source code according to your needs
