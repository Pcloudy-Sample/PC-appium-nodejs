<div align="center">

# Run Appium Tests with Node.js on pCloudy

[![pCloudy](https://img.shields.io/badge/Made%20by-pCloudy-1a73e8?style=for-the-badge)](https://www.pcloudy.com)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-Appium-FA5A28?style=for-the-badge)](https://webdriver.io/)

</div>

## Overview

[pCloudy](https://www.pcloudy.com) provides access to real Android and iOS devices from the cloud. This project contains Node.js Appium samples that run against pCloudy with minimal changes from standard Appium workflows.

## Prerequisites

- Node.js 20 or higher
- npm
- A [pCloudy account](https://www.pcloudy.com) with your registered email ID and API key
- Your app package or IPA uploaded to your pCloudy Cloud Drive when needed

## Setup

Clone the project and install dependencies:

```bash
git clone https://github.com/Pcloudy-Sample/PC-appium-nodejs.git
cd PC-appium-nodejs
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update the values in `.env` with your pCloudy credentials:

```bash
PCLOUDY_USERNAME=your_email_id
PCLOUDY_APIKEY=your_api_key
```

## Run the samples

Use the following npm scripts:

```bash
npm run android-app
npm run android-web
npm run ios-app
npm run ios-web
```

You can also run the scripts directly with Node:

```bash
node android-app.js
node android-web.js
node ios-app.js
node ios-web.js
```

The `appium:pCloudy_ApplicationName` capability must match the app already uploaded to your pCloudy Cloud Drive. For iOS, make sure the app name and bundle ID in the script match your uploaded app.

## Capabilities used in this sample

| Capability | Description |
|---|---|
| `pCloudy_Username` | Your pCloudy account email ID |
| `pCloudy_ApiKey` | Your pCloudy API key |
| `pCloudy_DeviceFullName` | Device name to book from pCloudy |
| `pCloudy_ApplicationName` | App uploaded to pCloudy Cloud Drive |
| `automationName` | Appium automation engine (`UiAutomator2` for Android or `XCUITest` for iOS) |
| `appium:appPackage` / `appium:appActivity` | Android package and launch activity |
| `bundleId` | iOS bundle identifier |

The driver connects to the pCloudy Appium hub at:

```text
https://device.pcloudy.com/appiumcloud/wd/hub
```

## Project structure

```text
PC-appium-nodejs/
├── package.json           # npm scripts and dependencies
├── utils.js               # Shared helpers for screenshots and driver setup
├── android-app.js         # Android native app sample
├── android-web.js         # Android web sample
├── ios-app.js             # iOS native app sample
├── ios-web.js             # iOS web sample
├── .env.example           # Example environment variables
├── screenshots/           # Captured screenshots
└── README.md              # Project documentation
```

## Notes

- Screenshots are saved to the screenshots folder while each script runs.
- Update the device names and app identifiers in the scripts if your pCloudy account uses different resources.

## Learn more

- [pCloudy Website](https://www.pcloudy.com)
- [Appium Documentation](https://appium.io/docs/en/latest/)
