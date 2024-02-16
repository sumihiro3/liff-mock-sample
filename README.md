# "LIFF Mock" sample with Nuxt 3

Look at the [LIFF Mock](https://github.com/line/liff-mock) to learn more.

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Run e2e test

Performs an e2e test according to the getProfile result of the LIFF API.

Running the test when `pictureUrl` is included in the profile

```bash
yarn e2e:user-has-picture
```

Run the test if the `pictureUrl` is not included in the profile.

```bash
yarn e2e:no-user-picture
```

[Please click here](https://speakerdeck.com/sumihiro3/liff-mock-shi-tutemasuka) to view the slides used for [the event](https://linedevelopercommunity.connpass.com/event/308139/) presentation.
