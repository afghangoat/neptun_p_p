//##########
//OLD NPU UTILS remade in pure js.
//##########

//TODO add cfg and globalcheck to functions.
//GM ?? back??
//Langs for try errors

// Stored data
let data = {};

// Load all data from local storage
async function initialize() {
	try {
		data = JSON.parse(await GM.getValue(cfg.neptun_data_name)) || {};
	} catch (e) {
		console.log(lang.err_ls_init);
	}
	await upgradeSchema();
}

// Save all data to local storage
function save() {
	return GM.setValue(cfg.neptun_data_name, JSON.stringify(data));
}

// Gets the value at the specified key path
function get(...keys) {
	return deepGetProp(data, keys);
}

// Sets the value at the specified key path
function set(...keysAndValue) {
	const value = keysAndValue.pop();
	const keys = keysAndValue;
	deepSetProp(data, keys, value);
	save();
}

// Gets the specified property or all data of the current user
function getForUser(...keys) {
	return get(cfg.neptun_neptuncode_id, getDomain(), getNeptunCode(), cfg.neptun_data_name, ...keys);
}

// Sets the specified property of the current user
function setForUser(...keysAndValue) {
	return set(cfg.neptun_neptuncode_id, getDomain(), getNeptunCode(), cfg.neptun_data_name, ...keysAndValue);
}

// Upgrade the data schema to the latest version
async function upgradeSchema() {
	const ver = typeof data.version !== "undefined" ? data.version : 0;

	// < 1.3
	if (ver < 1) {
		let users;
		try {
			users = JSON.parse(await GM.getValue(cfg.local_storage_main+"."+cfg.local_storage_users));
		} catch (e) {
			console.log(lang.err_ls_users);
		}
		
		if (Array.isArray(users)) {
			users.forEach(user => {
				set(cfg.neptun_neptuncode_id, getDomain(), user[0].toUpperCase(), "password", btoa(user[1]));
			});
		}
		
		let courses;
		
		try {
			courses = JSON.parse(await GM.getValue(cfg.local_storage_main+"."+cfg.local_storage_courses));
		} catch (e) {
			console.log(lang.err_ls_courses);
		}
		
		if (typeof courses === "object") {
			Object.keys(courses).forEach(user => {
				Object.keys(courses[user]).forEach(subject => {
					set(cfg.neptun_neptuncode_id, getDomain(), user, cfg.local_storage_courses, "_legacy", subject, courses[user][subject]);
				});
			});
		}
		
		data.version = 1;
	}

	save();
}
