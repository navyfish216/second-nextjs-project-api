import { isBefore, add } from "date-fns";
import { type User } from "@/type";

// type User = {
//     userId: string;
//     addDate: Date;
// }

const refreshTokenMap = new Map<string, User>();
const accessTokenMap = new Map<string, User>();

function cleanUpAndDebug(map: Map<string, User>, comparisonDate: Date) {
  map.forEach((value, key) => {
    if(isBefore(value.addDate, comparisonDate)) {
      console.log(`delete: ${key} ${value.userId}`);
      map.delete(key);
    } else {
      console.log(`${key} ${value.userId}`);
    }
  });
}

export function setRefreshTokenMap(token: string, userId: string) {
  console.log("setRefreshTokenMap");
  refreshTokenMap.set(token, {
    userId: userId, 
    addDate: new Date()
  });
  cleanUpAndDebug(refreshTokenMap, add(new Date(), {days: -7}));
}

export function getRefreshTokenMap(token: string): User | undefined {
  console.log("getRefreshTokenMap");
  cleanUpAndDebug(refreshTokenMap, add(new Date(), {days: -7}));
  const user = refreshTokenMap.get(token);
  console.log(`getRefreshTokenMap user ${user?.userId}`);

  return user;
}

export function setAccessTokenMap(token: string, userId: string) {
  console.log("setAccessTokenMap");
  accessTokenMap.set(token, {
    userId: userId, 
    addDate: new Date()
  });
  cleanUpAndDebug(accessTokenMap, add(new Date(), {minutes: -15}));
}

export function getAccessTokenMap(token: string): User | undefined {
  console.log("getAccessTokenMap");
  cleanUpAndDebug(accessTokenMap, add(new Date(), {minutes: -15}));
  const user = accessTokenMap.get(token);
  console.log(`getAccessTokenMap user ${user?.userId}`);

  return user;
}