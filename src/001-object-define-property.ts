let obj = {
  a: 10,
  c: 30,
};

// call
convert(obj);
obj.a;
obj.c;

function convert(obj) {
  Object.keys(obj).forEach((key) => {
    const internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`);
        return internalValue;
      },
      set(newWal) {
        internalValue = newWal;
      },
    });
  });
}
