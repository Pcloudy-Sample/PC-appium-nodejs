const { captureScreenshot, createDriver, waitForElement, buildCommonPcloudyOptions } = require('./utils');

async function main() {
  const capabilities = {
    platformName: 'iOS',
    'appium:platformVersion': '15.0.0',
    'appium:automationName': 'XCUITest',
    browserName: 'Safari',
    'appium:safariIgnoreFraudWarning': true,
    'pcloudy:options': buildCommonPcloudyOptions('APPLE_iPhone12ProMax_iOS_16.3.1_22ba7', true)
  };

  const driver = await createDriver(capabilities);

  try {
    await driver.url('https://www.example.com');
    await waitForElement(driver, 'body');
    await captureScreenshot(driver, 'iosweb-example');

    await driver.url('https://www.wikipedia.org');
    await waitForElement(driver, 'input[name="search"]');
    await captureScreenshot(driver, 'iosweb-wikipedia');

    const searchBox = await driver.$('input[name="search"]');
    await searchBox.setValue('Appium');
    await searchBox.keys(['Enter']);
    await waitForElement(driver, '#firstHeading');
    await captureScreenshot(driver, 'iosweb-search');
  } finally {
    await driver.deleteSession();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
