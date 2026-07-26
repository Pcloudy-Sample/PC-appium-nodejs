const { captureScreenshot, createDriver, waitForElement, buildCommonPcloudyOptions } = require('./utils');

async function main() {
  const capabilities = {
    platformName: 'Android',
    'appium:platformVersion': '13.0.0',
    'appium:automationName': 'UiAutomator2',
    browserName: 'Chrome',
    'pcloudy:options': buildCommonPcloudyOptions('SAMSUNG_GalaxyA52_Android_13.0.0_fcafd', true)
  };

  const driver = await createDriver(capabilities);

  try {
    await driver.url('https://www.example.com');
    await waitForElement(driver, 'body');
    await captureScreenshot(driver, 'androidweb-example');

    await driver.url('https://www.wikipedia.org');
    await waitForElement(driver, 'input[name="search"]');
    await captureScreenshot(driver, 'androidweb-wikipedia');

    const searchBox = await driver.$('input[name="search"]');
    await searchBox.setValue('Appium');
    await searchBox.keys(['Enter']);
    await waitForElement(driver, '#firstHeading');
    await captureScreenshot(driver, 'androidweb-search');
  } finally {
    await driver.deleteSession();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
