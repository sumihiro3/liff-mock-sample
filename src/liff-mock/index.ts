import { Profile } from '@liff/get-profile';
import * as mockData from './mock-data.json';

/**
 * Get mock profile
 * @param testUserId TEST_USER_ID
 * @returns mock profile
 */
export const getMockProfile = (testUserId: string): Profile => {
  const profiles = mockData.profile as Profile[];
  let profile = profiles.find((p) => p.userId === testUserId);
  console.log('profile', profile);
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
 * @returns mock scan code result
 */
export const getMockScanCodeResult = (testUserId: string): ScanCodeResult => {
  const scanCodeResults = mockData.scanCode as MockScanCodeResult[];
  const scanCodeResult = scanCodeResults.find((s) => s.userId === testUserId);
  console.log('scanCodeResult', scanCodeResult);
  let result;
  if (scanCodeResult) {
    result = {
      value: scanCodeResult.value,
    };
  } else {
    result = {
      value: null,
    };
  }
  return result;
};
