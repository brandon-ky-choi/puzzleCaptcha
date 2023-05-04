<h1>Puzzle Captcha - React component</h1>

<p>It automatically generates a very simple jigsaw kind of puzzle from any image on the web.</p>

<h3>Usage</h3>

<code>
import React from 'react';
import PuzzleCaptcha from 'PuzzleCaptcha';

function App() {
return (
<div>
<h1>Are you human?</h1>
<p>Please select the same puzzle piece.</p>
<PuzzleCaptcha
        image="https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?auto=compress&cs=tinysrgb&w=400"
        cols=(3}
        rows={3}
      />
</div>
);
}
</code>

<h3>Props</h3>

<table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>image</code>
          </td>
          <td>string</td>
          <td>Yes</td>
          <td>N/A</td>
          <td>The URL of image</td>
        </tr>
        <tr>
          <td>
            <code>cols</code>
          </td>
          <td>number</td>
          <td>Yes</td>
          <td>
            N/A
          </td>
          <td>Number of columns (1-10)</td>
        </tr>
        <tr>
          <td>
            <code>rows</code>
          </td>
          <td>number</td>
          <td>Yes</td>
          <td>
            N/A
          </td>
          <td>Number of rows (1-10)</td>
        </tr>
        <tr>
          <td>
            <code>width</code>
          </td>
          <td>number</td>
          <td>No</td>
          <td>
            100%
          </td>
          <td>Number of width(px) or 100% by default</td>
        </tr>
        <tr>
          <td>
            <code>onVerify</code>
          </td>
          <td>function</td>
          <td>No</td>
          <td>
            N/A
          </td>
          <td>Call back function when the user solved puzzle</td>
        </tr>
        <tr>
          <td>
            <code>inputName</code>
          </td>
          <td>string</td>
          <td>No</td>
          <td>
            <code>captcha</code>
          </td>
          <td>Name of input element to be passed within the form</td>
        </tr>
        <tr>
          <td>
            <code>token</code>
          </td>
          <td>string</td>
          <td>No</td>
          <td>
            <code>verified</code>
          </td>
          <td>Token value of input element to be passed within the form</td>
        </tr>
        <tr>
          <td>
            <code>className</code>
          </td>
          <td>string</td>
          <td>No</td>
          <td>
            N/A
          </td>
          <td>Style class name for styling modification</td>
        </tr>
      </tbody>
    </table>
