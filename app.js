//code that organize the pagination
let page = 1;
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

//event to load the next page
btnNext.addEventListener('click', () => {
	if(page < 100){
		page += 1;
		loadPeople();
	}
});

//event to load the previous page
btnPrevious.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		loadPeople();
	}
});

//asincronous method to load the people information
const loadPeople = async() => {
	try {
		const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
		console.log(response);
		//if the response is correct
		if(response.status === 200){
			const data = await response.json();
			
			let people = '';
			data.results.forEach(person => {
				people += `
					<div class="people">
						<h3 class="title">Name: ${person.name}</h3>
						<h3 class="poster">Height: ${person.height}</h3>
					</div>
				`;
			});
			document.getElementById('container').innerHTML = people;
		} else if(response.status === 401){
			//if the user is not autenticated(if apply)
			console.log('Wrong Key');
		} else if(response.status === 404){
			//if id person not exists
			console.log('The person no exists');
		} else {
			console.log('Error, contact administrator');
		}
	} catch(error){
		//manage another exception
		console.log(error);
	}
}

loadPeople();