/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

// const http = require('node:http');
// const { URL } = require('node:url');
import http from 'node:http';
import { URL } from 'node:url';
import qs from 'node:querystring'

import fs from 'fs';

const guestbookPath = 'guestbook.txt'


/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

function requestListener(request, response) {
  console.log('--------------------------------------');
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log('--------------------------------------');
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);
  /* ************************************************** */
  // if (!request.headers['user-agent'])
  if (url.pathname !== '/favicon.ico')
    // View detailed URL information
    console.log(url);

  /* *************** */
  /* "Routes" / APIs */
  /* *************** */

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
      /* ************************************************** */
      // Creating an answer header — we inform the browser that the returned data is HTML
      // response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      /* ************************************************** */
      // Setting a response body
      // response.write(``);
      /* ************************************************** */
      // response.end(); // The end of the response — send it to the browser



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
      /* ************************************************** */
      // Creating an answer header — we inform the browser that the returned data is plain text
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      /* ************************************************** */
      // Place given data (here: 'Hello <name>') in the body of the answer
      response.write(`Hello ${url.searchParams.get('name')}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
      /* ************************************************** */
      response.end(); // The end of the response — send it to the browser
      break;

    case 'GET /':
      fs.readFile(guestbookPath, 'utf8', (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          response.end('Error 500: Internal Server Error');
          return;
        }
        const entries = data.trim().split('\n');
        const guestbookEntries = entries.map((entry, index) => `<li>${entry}</li>`).join('');
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

    case 'POST /add':
      let body = '';
      request.on('data', chunk => {body += chunk.toString();});
      request.on('end', () => {
        const formData = qs.parse(body);
        const entry = `<div><h2>${formData.name}</h2><p>${formData.content}</p></div>`;

        // Dodanie nowego wpisu do księgi gości
        fs.appendFile(guestbookPath, `${entry}\n`, 'utf8', (err) => {
          if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write('Error 500: Internal Server Error');
            response.end();
          }
          else {
            // Przekierowanie na stronę główną po dodaniu wpisu
            response.writeHead(302, { 'Location': '/' });
            response.end();
          }
        });
      });
      break;


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