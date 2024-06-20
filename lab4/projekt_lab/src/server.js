/**
 * @fileOverview Server-side code for handling incoming requests and serving responses.
 * @module server
 * @requires node:http
 * @requires node:url
 * @requires node:querystring
 * @requires fs
 */

import http from "node:http";
import { URL } from "node:url";
import qs from "node:querystring";
import fs from "fs";
import {
  borrowProductToCustomer,
  getBorrowedProductsByCustomerId,
  getBoughtProductsByCustomerId,
  sellProductToCustomer
} from "./customersManager.js";
import { addNewProduct, getAllProducts } from "./productManager.js";
import { buildProductPage } from "./htmlMakerProductPage.js";
import { buildClientPage } from "./htmlMakerClientPage.js";

/**
 * Handles incoming requests.
 *
 * @param {http.IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
 * @param {http.ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * - The header contains, among others, information about the type (MIME) of data contained in the body.
 * - The body contains the correct data, e.g. a form definition.
 * @returns {void}
 * @function requestListener
 * @memberof module:server
 */

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);

  // View detailed URL information if the pathname is not '/favicon.ico'
  if (url.pathname !== "/favicon.ico") {
    console.log(url);
  }

  // Routes / APIs
  switch ([request.method, url.pathname].join(" ")) {
    case "GET /":
      getAllProducts((err, products) => {
        if (err) {
          console.log(err);
          response.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          response.write("Error 500: Internal Server Error");
          response.end();
          return;
        }
        const html = buildProductPage(products);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(html);
      });
      break;

    case "POST /sell":
      let customerId = url.searchParams.get("customerId");
      let productId = url.searchParams.get("productId");
      customerId = parseInt(customerId);
      productId = parseInt(productId);

      sellProductToCustomer(customerId, productId, (err, customer) => {
        if (err) {
          console.log(err);
          response.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          response.write("Error 500: Internal Server Error");
          response.end();
          return;
        }
        response.writeHead(302, { 'Location': '/' }); // Przekierowanie na nowy adres URL
        response.end();
      });
      break;

    case "GET /customer": {
      let customerId = url.searchParams.get("customerId");
      customerId = parseInt(customerId);
      getBoughtProductsByCustomerId(customerId, (err, boughtProducts) => {
        if (err) {
          console.log(err);
          response.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          response.write("Error 500: Internal Server Error");
          response.end();
          return;
        }
        getBorrowedProductsByCustomerId(customerId, (err, borrowedProducts) => {
          if (err) {
            console.log(err);
            response.writeHead(500, {
              "Content-Type": "text/plain; charset=utf-8",
            });
            response.write("Error 500: Internal Server Error");
            response.end();
            return;
          }
          const html = buildClientPage(boughtProducts, borrowedProducts ,customerId);
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(html);
        });

      });
      } break;

    case "POST /borrow": {
      let customerId = url.searchParams.get("customerId");
      let productId = url.searchParams.get("productId");
      customerId = parseInt(customerId);
      productId = parseInt(productId);

      borrowProductToCustomer(customerId, productId, (err, customer) => {
        if (err) {
          console.log(err);
          response.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          response.write("Error 500: Internal Server Error");
          response.end();
          return;
        }
        response.writeHead(302, { 'Location': '/' }); // Przekierowanie na nowy adres URL
        response.end();
      });
    } break;


    default:
      response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
      response.write("Error 501: Not implemented");
      response.end();
      break;
  }
}

/* ************************************************** */
/* Main block
/* ************************************************** */


const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
