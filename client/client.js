const handleResponse = (xhr, parseResponse) => {
    const content = document.querySelector('#content');

    switch(xhr.status) {
      case 200: //if success
        content.innerHTML = `<b>Success</b>`;
        break;
      case 201: //if created
        content.innerHTML = '<b>Create</b>';
        break;
      case 400: //if bad request
        content.innerHTML = `<b>Bad Request</b>`;
        break;
      case 401: //Unauthorized
        content.innerHTML = `<b>Unauthorized</b>`;
        break;
        case 403:
            content.innerHTML = `<b>Forbidden</b>`;
            break;
      case 404: //if not found
        content.innerHTML = `<b>Resource Not Found</b>`;
        break;
        case 500:
            content.innerHTML = `<b>Internal Server Error</b>`;
            break;
            case 501:
                content.innerHTML = `<b>Not Implemented</b>`
                break;
      default: //any other status
        content.innerHTML = `Error code not implemented by client.`;
        break;
    }
    
    //if we are expecting a response body (not in a head request)
    if(parseResponse) {
      //parse the object and print it to the console
      const obj = JSON.parse(xhr.response);
      console.dir(obj);
      
      //to make things easy to see, also print the raw JSON to the screen
      content.innerHTML += `<p>${xhr.response}</p>`;
    } else { 
      //if not parsing a response, just alert that meta data was recieved
      content.innerHTML += '<p>Meta Data Recieved</p>';
    }

  };

  //function to send request
  const requestUpdate = (e, userForm) => {
    //cancel browser's default action
    e.preventDefault();
    
    //grab url field 
    const url = userForm.querySelector('#page').value;
    //grab method selected
    const type = userForm.querySelector('#type').value;
    
    //create a new AJAX request (asynchronous)
    const xhr = new XMLHttpRequest();
    //setup connect using the selected method and url
    xhr.open('GET', url);
    //set accept header in request to application/json
    //The accept header is a comma separated list of
    //accepted response types in order of preference
    //from first to last. You only need to send one
    //but you can send many, separated by commas.
    xhr.setRequestHeader('Accept', type);

    xhr.onload = () => handleResponse(xhr, true);
    
    //send ajax request
    xhr.send();
    
    //return false to prevent page redirection from a form
    return false;
  };

  const init = () => {
    
    const userForm = document.querySelector('#top');
    const sendButton = document.querySelector('#send');

    //function to handle our request
    const getRequest = (e) => requestUpdate(e, userForm);
    
    //add event listener
    sendButton.addEventListener('click', getRequest);
  };

  window.onload = init;