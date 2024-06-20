function makeProductComponent(product){
  return `
  <div id=product${product.id} class="card col-md-3 m-4">
     <img src="${product.image}" class="card-img-top rounded mx-auto d-block" alt="Nie udalo sie wczytac zdjecia...">
    <h2 class=card-title">${product.name}</h2>
    <p class="card-text">${product.description}</p>
    <p class="card-text">Cena: ${product.price} zł</p>
  </div>
  `;
}


function makeComponentsForAllProducts(products){
  return products.map(makeProductComponent).join('');
}

function allProductsCost(products){
  let sum = 0;
  products.forEach(product => {
    sum += product.price;
  });
  return sum;
}

function buildClientPage(boughtProducts,borrowedProducts,customerId){
  return `
  <!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link
    crossorigin="anonymous"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    rel="stylesheet"
  />
  <!-- Icons -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    rel="stylesheet"
  />
  <title>sklep</title>
</head>
<body>
<nav class="navbar navbar-expand-md bg-warning" style="width: 100vw">
  <svg
    class="bi bi-car-front-fill mx-2"
    fill="currentColor"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276"
    />
    <path
      d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z"
    />
  </svg>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>
  </button>
  <div class="collapse navbar-collapse" id="btn">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <select class="bg-transparent border-0 my-2">
          <option value="pojazdy">Pojazdy</option>
          <option value="samoloty">Samochody</option>
          <option value="przyczepy">Przyczepy</option>
        </select>
      </li>
      <li class="nav-item">
        <input class="mx-2 rounded border border-secondary" placeholder="Szukaj" type="text" />
        <button class="bg-transparent rounded-3 border border-secondary p-2">Szukaj</button>
      </li>
    </ul>
  </div>
</nav>

<h1>Klient z id ${customerId} kupił:</h1>
<main id="root" class="container main-container .justify-content-center">
  <div class="row d-flex flex-row">
   ${makeComponentsForAllProducts(boughtProducts)}
  </div>
</main>
<h2>Zaplacil sumarycznie ${allProductsCost(boughtProducts)}</h2>
<h1>Klient z id ${customerId} wyporzyczyl:</h1>
<main id="root" class="container main-container .justify-content-center">
  <div class="row d-flex flex-row">
  ${makeComponentsForAllProducts(borrowedProducts)}
  </div>
</main>
<script
  crossorigin="anonymous"
  integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
></script>
</body>
</html>
  `
}

export {buildClientPage};