// Flat an object
const playObject = {
  flat: {
    name: "Flat Object",
  },
  nested: {
    name: "Nested Object",
    details: {
      description: "This is a nested object",
      properties: {
        prop1: "value1",
        prop2: "value2",
      },
    },
  },
};

function flatObject(obj, parentKey = "", result = {}) {
  for (let [key, value] of Object.entries(obj)) {
    let newkey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flatObject(value, newkey, result);
    } else {
      result[newkey] = value;
    }
  }
  return result;
}

// console.log(flatObject(playObject));

// Check if object is same or not (keys and values)

let obj1 = {
  name: "rohit",
  email: "rohit@gamil.com",
  address: {
    city: "gurgaon",
    pincode: "0001",
  },
};

let obj2 = {
  name: "virat",
  email: "virat@gamil.com",
  address: {
    city: "delhi",
    pincode: "0002",
  },
};

let obj3 = {
  name: "virat",
  email: "virat@gamil.com",
  address: {
    city: "delhi",
    pincode: "0002",
  },
};

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

console.log(`Object is same ? --> ${deepEqual(obj3, obj2)}`);
