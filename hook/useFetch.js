import axios from 'axios'
import { useState, useEffect } from 'react'

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			'content-type': 'application/octet-stream',
			'X-RapidAPI-Key': '6e085d9669mshadcfa850ca63f66p1eb416jsnd9034689599d',
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
		},
		params: {
			...query,
		},
	}

	const fetchData = async () => {
		setLoading(true)

		try {
			const response = await axios.request(options)
			setData(response.data.data)
			setLoading(false)
		} catch (error) {
			setError(error)
			alert('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const refetch = () => {
		setLoading(true)
		fetchData()
	}

	return { data, loading, error, refetch }
}

export default useFetch
