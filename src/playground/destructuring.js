// const address = ["raciborska", "kraków", "małopolska", "1999"];
// const address = [];

// const [, city, province = "województwo"] = address;
// console.log(`you are in ${city}, ${province}`);

const item = ["coffe ice", "$2,00", "$2,59", "$3"];

const [name, , mediumPrice] = item;
console.log(`A medium ${name} costs ${mediumPrice}`);
