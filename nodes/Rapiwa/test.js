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
	// Most of the work
	return getData();
}
(async function () {
	const result = await bigWork();
})();
console.log('need to use the response');

function resolveHumanStarship(obj, args, context, info) {
	return Promise.all(
		obj.starshipID.map((id) =>
			context.db.loadStarshipByID(id).then((shipData) => new starship(shipData)),
		),
	);
}

const fetchPostById = async () => {
	const response = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	method: 'POST';

	if (!response.ok) {
		throw new Error('Network is not established');
	}
	return (await response).json();
};
function func () {
	const {data, error, isLoading} = useQuery (['users'], fetchUsers);
}
