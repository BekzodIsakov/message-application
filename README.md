# Message app

[Live demo]()

![Main page](/client/src/assets/main-page.png "Main page")

## Technologies used

[![Technologies](https://skillicons.dev/icons?i=react,vite,bootstrap,express,nodejs,md&theme=light)](https://skillicons.dev)

The app is similar to a messaging service. Initially, you need to login so that
the app can save your name. Once you're taken to the main page after entering
your name on the auth page, you can enter the name of another contact/user you
want to send a message to. The contact may not exist at the time of sending the
message. But when someone enters the app with that contact/user name, he/she can
see messages sent to his/her name. A contact/user can send message to oneself.
First, messages were saved inside
[MongoDB Atlas](https://www.mongodb.com/docs/atlas) but as the app was created
for practicing purpose, messages are now saved as
[Markdown documents](https://www.markdownguide.org/getting-started/#what-is-markdown)
(.md files)
