<p align="center">
  <img src="https://www.anasterism.com/images/asterism-wbg.png" alt="Brought to you by: An Asterism">
</p>
---
### Asterism Form Handler
An ajax form handler written in vanilla javascript.

## Usage
**First:** Set up your form

```html
<form id="commentForm" action="/api/v1/comment" method="post" enctype="multipart/form-data">
    <div class="fieldset">
        <div class="field">
            <label for="first">First Name</label>
            <input type="text" name="first" id="first">
        </div>
        <div class="field">
            <label for="last">Last Name</label>
            <input type="text" name="last" id="last">
        </div>
    </div>
    <div class="field">
        <label for="comment">Comment</label>
        <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
    </div>
    <div class="controls">
        <button type="submit">Submit</button>
    </div>
</form>

<script type="text/javascript" src="dist/form.min.js"></script>
```

**Then** instantiate the form object

```javascript
var commentForm = new Form('#commentForm');
```

## Methods

| Method      | Arguments | Description                                       |
|-------------|:---------:|:--------------------------------------------------|
| **disable** | *none*    | Disables the form, setting each input to readonly |
| **enable**  | *none*    | Enables the form, removing the readonly attribute |
| **clear**   | *none*    | Clears each element of it's value.                |

## Events

| Event       | Description                       |
|-------------|:----------------------------------|
| **success** | Form submission was successful    |
| **invalid** | Form data contains invalid values |
| **error**   | A server error occurred           |
