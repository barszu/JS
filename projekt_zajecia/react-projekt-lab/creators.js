function create_client(name, surname, email) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid name. It should be a non-empty string.');
  }
  if (typeof surname !== 'string' || surname.trim() === '') {
    throw new Error('Invalid surname. It should be a non-empty string.');
  }
  if (typeof email !== 'string' || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    throw new Error('Invalid email. It should be a valid email address.');
  }
  return { name: name, surname: surname, email: email };
}

function create_vehicle(name, price, description) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid name. It should be a non-empty string.');
  }
  price = parseFloat(price);
  // console.log(price);
  // console.log(typeof price);
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Invalid price. It should be a positive number.');
  }
  if (typeof description !== 'string' || description.trim() === '') {
    throw new Error('Invalid description. It should be a non-empty string.');
  }
  return { name: name, price: price, description: description };
}

export { create_client, create_vehicle };