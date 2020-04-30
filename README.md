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
        In other to fix this problem, I had to factor in the sortedBy field, sortOrder and the mongoDb id when encoding and decoding the         cursor. By so doing, the cursor was truly transparent and the right results were returned regardless of the sorting fields.
- ## Saving images to cloud service
        Initially, the original plan was to use ImageKit cloud service for storing images uploaded my users. However, when it was
        time to implement this functionality, I realised that Apollo Graphql Server converts file uploads to Nodejs ReadStream. This
        was a challenge because ImageKit API does not have support for image uploads from Nodejs ReadStream. Having workded with
        cloudinary previously, I had to take a look at their API docs and 
[frontend source code](https://github.com/iammrsea/photo-sharing-app-Frontend)

You can clone or download the repo and modify the source code according to your needs
