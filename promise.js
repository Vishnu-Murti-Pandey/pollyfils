const p1 = Promise.resolve("Resolve 1");
const p2 = Promise.reject("Reject 2");
const p3 = Promise.resolve("Resolve 3");
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolve 4");
  }, 2000);
});

// Promise.race()

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

Promise.myRace([p1, p2, p3, p4])
  .then((data) => {
    console.log("My Race: ", data);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Promise.any()

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let rejection = 0;
    let errors = [];

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          rejection++;
          errors.push(err);

          if (rejection === promises.length) {
            reject(new AggregateError("All promise are rejected", errors));
          }
        });
    });
  });
};

Promise.myAny([p1, p2, p3, p4])
  .then((data) => {
    console.log("My Any: ", data);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Promise.all()

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let resolved = 0;
    let fulfilled = [];

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((data) => {
          resolved++;
          fulfilled.push(data);

          if (resolved === promises.length) {
            resolve(fulfilled);
          }
        })
        .catch((err) => {
          reject(new Error(err, "Promise is rejected"));
        });
    });
  });
};

Promise.myAll([p1, p2, p3, p4])
  .then((data) => {
    console.log("My All: ", data);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Promise.allSettled()

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let settled = [];
    let completed = 0;

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((data) => {
          let obj = { status: "fulfilled", data: data };
          settled.push(obj);
        })
        .catch((err) => {
          let obj = { status: "rejected", data: err };
          settled.push(obj);
        })
        .finally(() => {    
          completed++;
          if (completed === promises.length) {
            resolve(settled);
          }
        });
    });
    if (promises.length === 0) {
      resolve([]);
    }
  });
};

Promise.myAllSettled([p1, p2, p3, p4])
  .then((data) => {
    console.log("My All Settled: ", data);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
