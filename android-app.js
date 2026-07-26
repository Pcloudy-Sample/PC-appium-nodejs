const { captureScreenshot, createDriver, waitForElement, buildCommonPcloudyOptions } = require('./utils');

async function main() {
  const capabilities = {
    platformName: 'Android',
    'appium:platformVersion': '11.0.0',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'com.pcloudy.appiumdemo',
    'appium:appActivity': 'com.ba.mobile.LaunchActivity',
    'appium:newCommandTimeout': 600,
    'appium:launchTimeout': 90000,
    'appium:pCloudy_ApplicationName': 'pCloudyAppiumDemo.apk',
    'pcloudy:options': buildCommonPcloudyOptions('SAMSUNG_GalaxyA10s_Android_11.0.0_99cde', true)
  };

  const driver = await createDriver(capabilities);

  try {
    const acceptButton = await waitForElement(driver, "//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']");
    await acceptButton.click();
    await captureScreenshot(driver, 'android-accept');

    const flightButton = await waitForElement(driver, "//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']");
    await flightButton.click();
    await captureScreenshot(driver, 'android-flight');

    const fromSpinner = await waitForElement(driver, "//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']");
    await fromSpinner.click();
    await captureScreenshot(driver, 'android-from-spinner');
    const fromOption = await waitForElement(driver, "//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']");
    await fromOption.click();
    await captureScreenshot(driver, 'android-from-selected');

    const toSpinner = await waitForElement(driver, "//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']");
    await toSpinner.click();
    await captureScreenshot(driver, 'android-to-spinner');
    const toOption = await waitForElement(driver, "//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']");
    await toOption.click();
    await captureScreenshot(driver, 'android-to-selected');

    const singleTrip = await waitForElement(driver, "//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']");
    await singleTrip.click();
    const depart = await waitForElement(driver, "//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']");
    await depart.click();
    await captureScreenshot(driver, 'android-depart');
    const okButton = await waitForElement(driver, "//android.widget.Button[@resource-id='android:id/button1' and @text='OK']");
    await okButton.click();
    await captureScreenshot(driver, 'android-depart-confirmed');

    const search = await waitForElement(driver, "//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']");
    await search.click();
    await captureScreenshot(driver, 'android-search');
  } finally {
    await driver.deleteSession();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
