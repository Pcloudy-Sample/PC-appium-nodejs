const fs = require('fs');
const path = require('path');
const { remote } = require('webdriverio');
require('dotenv').config();

const PCLOUDY_USERNAME = process.env.PCLOUDY_USERNAME || '';
const PCLOUDY_APIKEY = process.env.PCLOUDY_APIKEY || '';

function ensureScreenshotsDir() {
  const dir = path.join(process.cwd(), 'screenshots');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function captureScreenshot(driver, label) {
  const dir = ensureScreenshotsDir();
  const filePath = path.join(dir, `${label}-${Date.now()}.png`);
  await driver.saveScreenshot(filePath);
  console.log(`Saved screenshot: ${filePath}`);
}

async function waitForElement(driver, selector, timeout = 20000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

function validatePcloudyCredentials() {
  const placeholderPatterns = [/^sample_/i, /^your_/i, /^YOUR_/i, /^changeme$/i, /^<.*>$/];
  const isPlaceholder = (value) => !value || placeholderPatterns.some((pattern) => pattern.test(value));

  if (isPlaceholder(PCLOUDY_USERNAME) || isPlaceholder(PCLOUDY_APIKEY)) {
    throw new Error(
      'pCloudy credentials are not configured. Update the .env file with your real PCLOUDY_USERNAME and PCLOUDY_APIKEY values before running the sample.'
    );
  }
}

async function createDriver(capabilities) {
  validatePcloudyCredentials();

  return remote({
    protocol: 'https',
    hostname: 'device.pcloudy.com',
    port: 443,
    path: '/appiumcloud/wd/hub',
    logLevel: 'info',
    capabilities
  });
}

function buildCommonPcloudyOptions(deviceFullName, enableVideo = true) {
  return {
    pCloudy_Username: PCLOUDY_USERNAME,
    pCloudy_ApiKey: PCLOUDY_APIKEY,
    pCloudy_DeviceFullName: deviceFullName,
    pCloudy_WildNet: false,
    pCloudy_EnableVideo: enableVideo,
    pCloudy_EnablePerformanceData: false,
    pCloudy_EnableDeviceLogs: false,
    appiumVersion: '3.1.1'
  };
}

module.exports = {
  captureScreenshot,
  waitForElement,
  createDriver,
  buildCommonPcloudyOptions,
  PCLOUDY_USERNAME,
  PCLOUDY_APIKEY
};
