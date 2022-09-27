export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create variables to hold reference to the databese, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database)
    // run this method and create the three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key
      // index to be the `_id` of the data
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // on database open success
    request.onsuccess = function (e) {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName`(must match one
      //  of the object store names) and the permissions we want in this transaction
      tx = db.transaction(storeName, "readwrite");
      // save a reference to that object store so can perform CRUD method to
      // read, write, or update the data
      store = tx.objectStore(storeName);

      // if there's any errors, let us know
      db.onerror = function (e) {
        console.log("error", e);
      };

      // check which value passed into function as method
      // and perfom that method on object store
      // switch statement to check what the value of the method is
      switch (method) {
        // run .put() method on the object store, overwriting any data with matching
        // _id value from the object and adding it if it can't find a match.
        case "put":
          store.put(object);
          resolve(object);
          break;
        // if get, get all data from that store and return it
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        // delete that item from the object store. (can now delete from cart while offline)
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };

    // handle any erros with connecting
    request.onerror = function (e) {
      console.log("There was an error");
    };
  });
}
