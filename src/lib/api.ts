const base = `${import.meta.env.VITE_WEB_URL}/api`;

interface SendParams {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	data?: unknown;
	token: string;
}

async function send({ method, path, data, token }: SendParams) {
	const opts = {
		method, 
		headers: {
			'Content-Type': 'application/json',
			'Authorization': ``
		},
	};

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				const resParsed = JSON.parse(json);

				if (resParsed?.status === 'error') {
					console.log(`API response error from ${base}/${path}: ${json}`);
				}

				return resParsed;
			} catch (err) {
				return json;
			}
		});
}



export function get(path: string, token?: string) {
	return send({ method: 'GET', path, token: token || '' });
}

export function del(path: string, token: string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: unknown, token?: string) {
	return send({ method: 'POST', path, data, token: token || '' });
}

export function put(path: string, data: unknown, token: string) {
	return send({ method: 'PUT', path, data, token });
}