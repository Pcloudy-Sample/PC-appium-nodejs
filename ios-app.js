const { captureScreenshot, createDriver, waitForElement, buildCommonPcloudyOptions } = require('./utils');

async function main() {
  const capabilities = {
    platformName: 'iOS',
    'appium:platformVersion': '15.0.0',
    'appium:automationName': 'XCUITest',
    'appium:bundleId': 'com.pcloudy.TestmunkDemo',
    'appium:newCommandTimeout': 600,
    'appium:launchTimeout': 90000,
    'appium:pCloudy_ApplicationName': 'pCloudy_Appium_Demo-1782572132_Resigned1782583101.ipa',
    'pcloudy:options': buildCommonPcloudyOptions('APPLE_iPhone11Pro_iOS_17.5.1_45645', false)
  };

  const driver = await createDriver(capabilities);

  try {
    const emailField = await waitForElement(driver, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]");
    await emailField.setValue('test@testname.com');
    await captureScreenshot(driver, 'ios-email');

    const passwordField = await waitForElement(driver, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]");
    await passwordField.setValue('testmunk');
    await captureScreenshot(driver, 'ios-password');

    const loginButton = await waitForElement(driver, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]");
    await loginButton.click();
    await captureScreenshot(driver, 'ios-login');

    const skipButton = await waitForElement(driver, "//XCUIElementTypeButton[@name='Skip']");
    await skipButton.click();
    const alertButton = await waitForElement(driver, "//*[contains(@name,'SHOW ALERT VIEW')]");
    await alertButton.click();
    await captureScreenshot(driver, 'ios-alert');
  } finally {
    await driver.deleteSession();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
