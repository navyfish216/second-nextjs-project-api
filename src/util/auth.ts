import { isBefore, add } from "date-fns";

type User = {
    userId: string;
    addDate: Date;
}

const userMap = new Map<string, User>();

function cleanUpAndDebug() {
  const comparisonDate = add(new Date(), {
    minutes: -15,
  });

  userMap.forEach((value, key) => {
    if(isBefore(value.addDate, comparisonDate)) {
      console.log(`delete: ${key} ${value.userId}`);
      userMap.delete(key);
    } else {
      console.log(`${key} ${value.userId}`);
    }
  });
}

export function setUserMap(token: string, userId: string) {
  console.log("setUserMap");
  userMap.set(token, {
    userId: userId, 
    addDate: new Date()
  });
  cleanUpAndDebug();
}

export function getUserMap(token: string): User | undefined {
  console.log("getUserMap");
  cleanUpAndDebug();
  const user = userMap.get(token);
  console.log(`getUserMap user ${user?.userId}`);

  return user;
}