const sortData = ['numFunc', 'localStorage', 'gutFile', 'enumType', 'callBackFunc', 'localStorage'];

// const middleWare = sortData.map((data) => `${data} -`);

// console.log(middleWare);
// console.log(sortData);

// false, 0, undefined, null, '', NaN;

// nullish = null | undefined;
// let lang = false;

// console.log(lang ?? 'JavaScript');
// console.log(lang || 'JavaScript');
// console.log(lang && 'JavaScript');

async function getData() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

		const data = await response.json();
	} catch (err) {
		console.log(err);
	}
}

function bigWork() {
	// onek kajs
	return getData();
}
(async function () {
	const result = await bigWork();
})();
console.log('need to use the response');
