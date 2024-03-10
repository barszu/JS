function sum(x, y) {
  return x + y;
}

function sum_strings(arr) {
  let sum = 0;
  for (const str_val of arr) {
    sum += parseInt(str_val) ? parseInt(str_val) : 0
  }
  return sum;
}

function digits(arr) {
  let odd_sum = 0;
  let even_sum = 0;
  for (const str_val of arr) {
    // str_val.filter((x) => x.match(/[0-9]/));
    const num = parseInt(str_val) ? parseInt(str_val) : 0;
    if (num % 2 === 0) {
      even_sum += num;
    } else {
      odd_sum += num;
    }
  }
  return [odd_sum, even_sum];
}

function letters(str) {
  let lower_no = 0;
  let upper_no = 0;
  for (const str_val of str) {
    if (str_val.match(/[a-z]/)) {
      lower_no++;
    } else if (str_val.match(/[A-Z]/)) {
      upper_no++;
    }
  }
  return [lower_no, upper_no];
}

