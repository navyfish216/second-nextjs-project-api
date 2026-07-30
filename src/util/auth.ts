type User = {
    userId: string;
}

const userMap = new Map<string, User>();

export function setUserMap(token: string, userId: string) {
  console.log("setUserMap");
  userMap.set(token, {userId: userId});

  userMap.forEach((value, key) => {
    console.log(key, value.userId);
  });
}

export function getUserMap(token: string): User | undefined {
  console.log("getUserMap");
  userMap.forEach((value, key) => {
    console.log(key, value.userId);
  });
  const user = userMap.get(token);
  console.log(`getUserMap user ${user?.userId}`);

  return user;
}