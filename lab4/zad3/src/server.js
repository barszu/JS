/**
 * @fileOverview Server-side code for handling incoming requests and serving responses.
 * @module server
 * @requires node:http
 * @requires node:url
 * @requires node:querystring
 * @requires fs
 */

import http from 'node:http';
import { URL } from 'node:url';
import qs from 'node:querystring'
import fs from 'fs';

const guestbookPath = 'guestbook.txt'

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
  console.log('--------------------------------------');
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log('--------------------------------------');
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);
  
  // View detailed URL information if the pathname is not '/favicon.ico'
  if (url.pathname !== '/favicon.ico') {
    console.log(url);
  }

  // Routes / APIs
  switch ([request.method, url.pathname].join(' ')) {
    /*
      -------------------------------------------------------
      Generating the form if
         the GET method was used to send data to the server
      and
         the relative URL is '/',
      -------------------------------------------------------
    */
    case 'GET /welcome':
      fs.readFile('./welcome-page.html', 'utf8', (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          response.write('Error 500: Internal Server Error');
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          response.write(data);
          response.end();
        }
      });
      break;

    /*
      ------------------------------------------------------
      Processing the form content, if
          the GET method was used to send data to the server
      and
          the relative URL is '/submit',
      ------------------------------------------------------
    */
    case 'GET /welcome/submit':
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.write(`Hello ${url.searchParams.get('name')}`);
      response.end();
      break;

    case 'POST /welcome':
      let body = '';
      request.on('data', (chunk) => {body += chunk.toString();});
      request.on('end', () => {
        // Parsing data sent in the form
        const formData = qs.parse(body);
        const name = formData.name || 'Unknown'; // Set the name if it was not sent
        // Generate the response
        const responseMessage = `Hello ${name}`;
        // Send the response
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(responseMessage);
      });
      break;

    case 'GET /':
      fs.readFile(guestbookPath, 'utf8', (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          response.end('Error 500: Internal Server Error');
          return;
        }
        const entries = data.trim().split('\n');
        const guestbookEntries = entries.map((entry) => `<li>${entry}</li>`).join('');
        const html = `
        <!DOCTYPE html>
        <html lang="pl">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Księga gości</title>
          </head>
          <body>
            <h1>Księga gości:</h1>
            <ul style="list-style-type: none;">${guestbookEntries}</ul>
            <hr>
            <h2>Dodaj wpis:</h2>
            <form method="POST" action="/add">
              <label for="name">Imię i nazwisko:</label><br>
              <input type="text" id="name" name="name" placeholder="Jan Kowalski" style="border-radius: 5px; padding: 10px; border: 2px solid #ccc; font-size: 16px; width: 200px;"><br>
              <label for="content">Treść wpisu:</label><br>
              <textarea id="content" name="content" placeholder="super strona" style="border-radius: 5px; padding: 10px; border: 2px solid #ccc; font-size: 16px; width: 200px;"></textarea><br>
              <input type="submit" value="Dodaj wpis" style="border-radius: 5px; padding: 10px; border: 2px solid #ccc; font-size: 16px;">
            </form>

          </body>
        </html>
      `;
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
      });
      break;

    case 'POST /add': {
      let body = '';
      request.on('data', chunk => {body += chunk.toString();});
      request.on('end', () => {
        const formData = qs.parse(body);
        const entry = `<div><h2>${formData.name}</h2><p>${formData.content}</p></div>`;

        // Add a new entry to the guestbook
        fs.appendFile(guestbookPath, `${entry}\n`, 'utf8', (err) => {
          if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write('Error 500: Internal Server Error');
            response.end();
          }
          else {
            // Redirect to the main page after adding the entry
            response.writeHead(302, { 'Location': '/' });
            response.end();
          }
        });
      });
      break;
    };

    /*
      ----------------------
      If no route is matched
      ----------------------
    */
    default:
      response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.write('Error 501: Not implemented');
      response.end();
      break;
  }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');