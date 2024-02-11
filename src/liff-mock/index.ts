import { Profile } from '@liff/get-profile';
import * as mockData from './mock-data.json';

export const getMockProfile = (testId: string): Profile => {
  const profiles = mockData.profile as Profile[];
  let profile = profiles.find((p) => p.userId === testId);
  console.log('profile', profile);
  if (!profile) {
    profile = {
      displayName: testId,
      userId: testId,
    };
  }
  return profile;
};
