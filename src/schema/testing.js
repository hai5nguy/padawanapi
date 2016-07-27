const sleep = async () => {
	return await new Promise((resolve, reject) => {
		var delay = process.env.API_DELAY || 0
		setTimeout(() => {
			resolve()
		}, delay)
	})
}

export default { sleep }