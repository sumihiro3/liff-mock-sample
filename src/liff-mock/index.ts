import { Profile } from '@liff/get-profile';
import * as mockData from './mock-data.json' assert { type: 'json' };

/**
 * Get mock profile
 * @param testUserId TEST_USER_ID
 * @param data mock data
 * @returns mock profile
 */
export const getMockProfile = (testUserId: string, data?: any): Profile => {
  // mock data
  const profiles = data
    ? (data.profile as Profile[])
    : (mockData.profile as Profile[]);
  // find profile
  let profile = profiles.find((p) => p.userId === testUserId);
  // console.log('profile', profile);
  if (!profile) {
    profile = {
      displayName: testUserId,
      userId: testUserId,
    };
  }
  return profile;
};

interface MockScanCodeResult {
  userId: string;
  value: string;
}

interface ScanCodeResult {
  value: string | null;
}

/**
 * Get mock scan code result
 * @param testUserId TEST_USER_ID
 * @param data mock data
 * @returns mock scan code result
 */
export const getMockScanCodeResult = (
  testUserId: string,
  data?: any,
): ScanCodeResult => {
  // mock data
  const scanCodeResults = data
    ? (data.scanCode as MockScanCodeResult[])
    : (mockData.scanCode as MockScanCodeResult[]);
  // find scan code result
  const scanCodeResult = scanCodeResults.find((s) => s.userId === testUserId);
  // console.log('scanCodeResult', scanCodeResult);
  let result: ScanCodeResult = { value: null };
  if (scanCodeResult) {
    result.value = scanCodeResult.value;
  }
  return result;
};
