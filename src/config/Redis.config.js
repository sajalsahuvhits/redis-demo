import { createClient } from "redis";

let client;
export const connectRedis = async(req, res, next) => {
    client = createClient();
    console.log("client redis")
    client.on("error", (err) => {
      console.log("Redis client error " + err);
    });
    client.on("connect", ()=>{
      console.log("Redis client connected");
    })
    await client.connect();
    // await client.set("counter", 0);
    next();
}

export const disconnectRedis = async(req, res, next) => {
    await client.quit();
    next();
}

// #region String Datatype methods
export const saveRedisString = async (key, value) => {
  try {
    let res = await client.set(key, value);
    await client.incr("counter")
    let quitRedisClient = await client.quit();
    console.log("quitRedisClient: ", quitRedisClient)
    console.log("set value: ",res)    
  } catch (error) {
    console.error(error.message)
  }
}

export const getRedisString = async (key) => {
  try {
    let res = await client.get(key);
    console.log("get value: ",res)  
    let quitRedisClient = await client.quit();
    console.log(quitRedisClient)
    return res;  
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteRedisString = async (key) =>{
  try {
    let res = await client.del(key);
    console.log("delete string: ", res)
    let quitRedisClient = await client.quit();
    console.log(quitRedisClient)
    return res;
  } catch (error) {
    console.error(error.message)
  }
}

// #region Hash data type methods
async function runDemo() {
  const userId = 'user:1000';

  // Set multiple fields in the hash
  await client.hSet(userId, 'name', 'John Doe', 'age', '30', 'email', 'john.doe@example.com');
  console.log('Hash fields set.');

  // Get all fields and values in the hash
  const user = await client.hGetAll(userId);
  console.log('User data:', user);

  // Get a specific field value
  const userName = await client.hGet(userId, 'name');
  console.log('User name:', userName);

  // Increment a field value
  await client.hIncrBy(userId, 'age', 1);
  const userAge = await client.hGet(userId, 'age');
  console.log('User age incremented:', userAge);

  // Delete a field
  await client.hDel(userId, 'email');
  const userAfterDelete = await client.hGetAll(userId);
  console.log('User data after deleting email:', userAfterDelete);

  // Clean up
  await client.del(userId);
  console.log('User data deleted.');

  client.quit();
}

export const saveRedisHash = async (userId) => {
  try {
    await client.hSet(userId, "name", "Sajal Sahu", "age", "25", "City", "Indore");
    await client.hSet(userId, "City", "Indore");
    await client.hSet(userId, "age", "25", );


    console.log("Save hash: ", res)
    await client.quit();
    return res;
  } catch (error) {
    console.error(error.message)
  }
}

export const getAllRedisHash = async (userId)=>{
  try {
    let res = await client.hGetAll(userId);
    console.log("Save hash: ", res)
    await client.quit();
    return res;
  } catch (error) {
    console.error(error.message)
  }
}

async function runListDemo() {
    const listKey = 'myList';

    // Push elements to the list (left push)
    await client.lPush(listKey, 'element1');
    await client.lPush(listKey, 'element2');
    await client.lPush(listKey, 'element3');
    console.log('Elements pushed to list.');

    // Get all elements from the list
    const listElements = await client.lRange(listKey, 0, -1);
    console.log('All elements in the list:', listElements);

    // Pop element from the list (left pop)
    const poppedElement = await client.lPop(listKey);
    console.log('Popped element:', poppedElement);

    // Get all elements after pop
    const listElementsAfterPop = await client.lRange(listKey, 0, -1);
    console.log('Elements in the list after pop:', listElementsAfterPop);

    // Clean up
    await client.del(listKey);
    console.log('List deleted.');

    client.quit();
}

function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  
  const formattedNumber = formatter.format(number);

  const suffixes = ["K", "M", "B", "T"];
  for (const suffix of suffixes) {
    if (formattedNumber.endsWith(suffix) && !formattedNumber.includes(".")) {
      const baseValue = parseFloat((number / Math.pow(10, 3 * (suffixes.indexOf(suffix) + 1))).toFixed(1));
      return `${baseValue}${suffix}`;
    }
  }

  return formattedNumber;
}

// console.log(formatCompactNumber("0")); 
// console.log(formatCompactNumber(12200)); 
// console.log(formatCompactNumber(1200100)); 
// console.log(formatCompactNumber(2000000000)); 
// console.log(formatCompactNumber(3500000000000)); 
// console.log(formatCompactNumber(234534343))
