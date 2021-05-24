# Geschossgeschwindigkeit
Geschossgeschwindigkeit is the future of sites for measuring typing speed!

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode. The host is 0.0.0.0 by default.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

## Main Features

To measure your speed just start typing in the field below sample text.
Amount of time is limited. But you can always start a new test — just click
a button `RESTART`. Don't worry about a mistake, you won't be able to continue
without correcting a typo. Also mistakes lowers your accuracy.

* Sample text is received from public API. In this case from [Bacon Ipsum API](https://baconipsum.com/api/).
* All input text is displayed automatically and is shown in text area below sample text.
* User is not allowed to delete typed correct text.
* Typo is not submitted. Also if a user makes a typo at the same place, it's not counted as a mistake again.
* A typo is marked in red in the sample text. At the same time all correct text is marked in green.
* Features are calculated in real time, such as:
1. Accuracy of your typing speed;
2. Speed (symbols per minute);
3. Amount of mistakes;
4. Timer.

## Tech Stack

* React
* Webpack
