//JS file
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
    //function block
    if (input.value !== '') {

        //create a li element
        const li = document.createElement('li');
        //create a delete button
        const deleteButton = document.createElement('button');

        //populate the li elements textContent or innerHTML with the input value
        li.textContent = input.value;
        //populate the button textContent with a ❌
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('aria-label', `Eliminar ${input.value}`);

        //append the li element with the delete button
        li.append(deleteButton);
        //append the li element to the unordered list in HTML
        list.append(li);

        //add an event listener to the delete button
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);

            //send the focus to the input element
            input.focus();
        });

        //change the input value to nothing
        input.value = '';
        input.focus();
    }
});
